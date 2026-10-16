import * as React from 'react';
import { FILENAME } from './constant';
import { createLogger } from './logger';

export type ReleaseStatus = 'error' | 'new-release' | 'no-release' | null;

export type ReleaseStatusOptions = {
  enabled?: boolean;
  storageKey: string;
  /**
   * URL of the release file. Relative URLs resolve against the current page.
   * @default '/RELEASE'
   */
  url?: string;
  verbose?: boolean;
};

const DEFAULT_URL = `/${FILENAME}`;

let lastStatus: ReleaseStatus = null;
let isReloading = false;

async function getReleaseStatus(options: ReleaseStatusOptions): Promise<ReleaseStatus> {
  const { enabled = true, storageKey, url = DEFAULT_URL, verbose = false } = options;

  if (typeof window === 'undefined' || !enabled) {
    lastStatus = null;
    return lastStatus;
  }

  const logger = createLogger(verbose);

  try {
    // Add a timestamp so the browser and any CDN return the current file, not a cached one
    const resourceURL = new URL(url, window.location.href);
    resourceURL.searchParams.set('v', Date.now().toString());
    const response = await fetch(resourceURL);
    if (!response.ok) {
      throw new Error(`Unexpected response status ${response.status}`);
    }
    const releaseId = (await response.text()).trim();
    // A missing release file often falls back to the app's index.html with a 200 status.
    if (releaseId.startsWith('<')) {
      throw new Error('Release file returned HTML instead of a release ID');
    }
    const releaseIdFromStorage = localStorage.getItem(storageKey);
    if (releaseId !== releaseIdFromStorage) {
      localStorage.setItem(storageKey, releaseId);
      // On a first visit there is nothing stored yet and the page was just loaded from the
      // server, so it is already up to date.
      if (releaseId && releaseIdFromStorage !== null) {
        logger('log', 'New release detected.');
        lastStatus = 'new-release';
        return lastStatus;
      }
    }
    logger('log', 'No new release detected.');
    lastStatus = 'no-release';
    return lastStatus;
  } catch (error) {
    logger('error', 'An error occurred while verifying release id', error);
    lastStatus = 'error';
    return lastStatus;
  }
}

/**
 * Reloads the page to load a new release, at most once per release ID per tab.
 *
 * The release ID was already saved by the check, so after the reload the IDs match and the
 * status is `'no-release'`. The session marker stops a reload loop if the server keeps
 * returning a different ID.
 *
 * @returns `true` if a reload was started.
 */
export function reloadForNewRelease(storageKey: string, verbose = false): boolean {
  // Another caller (StrictMode's second effect run, or a second CacheBuster) already started it.
  if (isReloading) {
    return true;
  }

  const logger = createLogger(verbose);
  const releaseId = localStorage.getItem(storageKey);
  const markerKey = `${storageKey}:reloaded`;

  try {
    if (sessionStorage.getItem(markerKey) === releaseId) {
      logger('error', 'Already reloaded for this release. Skipping to avoid a reload loop.');
      return false;
    }
    sessionStorage.setItem(markerKey, releaseId ?? '');
  } catch {
    // sessionStorage can be unavailable (e.g. blocked storage); reload without the marker.
  }

  logger('log', 'Reloading page to load the new release.');
  isReloading = true;
  window.location.reload();
  return true;
}

// The check saves the new release ID, so running it twice in one page load (effects run twice in
// StrictMode, or several components use the hook) would make the second run see matching IDs and
// report 'no-release'. Share one check per storage key instead. Failed checks are not kept, so a
// later mount can retry.
const releaseChecks = new Map<string, Promise<ReleaseStatus>>();

function checkReleaseOnce(options: ReleaseStatusOptions): Promise<ReleaseStatus> {
  const { enabled = true, storageKey } = options;
  if (typeof window === 'undefined' || !enabled) {
    return getReleaseStatus(options);
  }

  let check = releaseChecks.get(storageKey);
  if (!check) {
    check = getReleaseStatus(options);
    releaseChecks.set(storageKey, check);
    check.then((status) => {
      if (status === 'error') {
        releaseChecks.delete(storageKey);
      }
    });
  }
  return check;
}

export function useReleaseStatus(options: ReleaseStatusOptions) {
  const { enabled, storageKey, url, verbose } = options;

  const [isNewRelease, setIsNewRelease] = React.useState<ReleaseStatus>(lastStatus);

  React.useEffect(() => {
    checkReleaseOnce({ enabled, storageKey, url, verbose }).then((newReleaseStatus) => {
      setIsNewRelease(newReleaseStatus);
    });
  }, [storageKey, url, verbose, enabled]);

  return isNewRelease;
}
