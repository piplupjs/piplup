# @piplup/cache-buster

[![npm](https://img.shields.io/npm/v/@piplup/cache-buster)](https://www.npmjs.com/package/@piplup/cache-buster)

Cache buster library (<1kb) for React that helps in busting cache by checking changes for a unique release ID and calling window.location.reload when a change is detected in release ID.

## Installation

You can install @piplup/cache-buster using:

```bash
npm install @piplup/cache-buster

// or

yarn add @piplup/cache-buster

// or

pnpm add @piplup/cache-buster
```

## Usage

1. **Integration with your build process**:

   Include a script in your package.json to generate a release ID before building your application:

```json
{
  "scripts": {
    "build": "piplup-cache-buster --publicDir=public && react-scripts build"
  }
}
```

Alternatively, if you are using `vite` to build your react application. You can use `@piplup/vite-plugin-cache-buster` and update your vite configuration file (usually `vite.config.js` or `vite.config.ts`) to the following:

```javascript
import { vitePluginCacheBuster } from '@piplup/vite-plugin-cache-buster';

export default {
  // Other Vite config options...
  plugins: [vitePluginCacheBuster() /*...other plugins */],
};
```

2. **Integrate CacheBuster into your application**:

```jsx
import { CacheBuster } from '@piplup/cache-buster';

function App() {
  return (
    <>
      <CacheBuster
        loading={null} // Optional: Add a loading component to display loading.
        verbose={false} // Optional: If true, logs will be visible.
        storageKey="RELEASE" // Optional: local storage key for storing the unique release ID.
        enabled={process.env.NODE_ENV === 'production'}
      />
      <YourApp />
    </>
  );
}

export default App;
```

## Props

- `enabled` (optional): Boolean indicating whether the cache busting functionality should be enabled. Default is `true`.
- `loading` (optional): React node to be displayed while checking for updates. Default is `null`.
- `error` (optional): React node to be displayed when the release check fails, for example when the device is offline, the `RELEASE` file is missing (non-2xx response), or the server returns an HTML page instead of a release ID. Default is `undefined`, which renders nothing. If you wrap your app in `CacheBuster`, pass the same content (or a fallback UI) to `error` so the app still renders when the check fails.
- `verbose` (optional): Boolean indicating whether verbose logging should be enabled. Default is `false`.
- `storageKey` (optional): local storage key for storing the unique release ID. Default is `RELEASE`
- `url` (optional): URL of the release file. Relative URLs resolve against the current page. Default is `/RELEASE`. See [Serving from a sub-path](#serving-from-a-sub-path).
- `children` (optional): The child components to render within the cache buster.

## How It Works

`CacheBuster` fetches a release ID from `/RELEASE` at the root of your site (the file generated in your public folder), or from `url` if you set it, once per page load, and compares it with the ID stored in the browser's local storage:

- **First visit** (nothing stored yet): it stores the ID and renders the child components. The page was just loaded from the server, so there's nothing to reload.
- **Same ID**: it renders the child components.
- **Different ID** (a new release): it stores the new ID, keeps showing `loading`, and reloads the page once. After the reload the IDs match, so the app renders normally. If the server keeps returning a different ID, it reloads at most once per release ID per tab, then renders the child components instead of reloading again.
- **Check failed**: it renders `error`.

To handle releases yourself instead, use the `useReleaseStatus({ storageKey, enabled, url, verbose })` hook. It returns `null` while checking (or when disabled), then `'no-release'`, `'new-release'` or `'error'`, and doesn't reload the page.

## Serving from a sub-path

If your app is served from a sub-path such as `https://example.com/app/`, the release file is at `/app/RELEASE`, not `/RELEASE`. Pass its location with `url`:

```jsx
// Vite: BASE_URL is the `base` from your Vite config, e.g. '/app/'
<CacheBuster url={`${import.meta.env.BASE_URL}RELEASE`}>
  <YourApp />
</CacheBuster>

// Any setup
<CacheBuster url="/app/RELEASE">
  <YourApp />
</CacheBuster>
```

## Contributing

Contributions are welcome! Feel free to submit issues or pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
