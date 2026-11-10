# @piplup

Welcome to @piplup! A collection of open-source React libraries that handle the boilerplate React
developers keep writing.

Each library now lives in its own repository, so it versions and releases on its own schedule.
Documentation for all of them is at [piplupjs.com](https://www.piplupjs.com/), built from
[piplupjs/piplup-docs](https://github.com/piplupjs/piplup-docs).

## Where the packages live

| Package | Repository |
| --- | --- |
| [`@piplup/cache-buster`](https://www.npmjs.com/package/@piplup/cache-buster) and [`@piplup/vite-plugin-cache-buster`](https://www.npmjs.com/package/@piplup/vite-plugin-cache-buster) | [piplupjs/piplup-cache-buster](https://github.com/piplupjs/piplup-cache-buster) |
| [`@piplup/react-acl`](https://www.npmjs.com/package/@piplup/react-acl) | [piplupjs/piplup-react-acl](https://github.com/piplupjs/piplup-react-acl) |
| [`@piplup/utils`](https://www.npmjs.com/package/@piplup/utils) | [piplupjs/piplup-utils](https://github.com/piplupjs/piplup-utils) |
| [`@piplup/rhf-core`](https://www.npmjs.com/package/@piplup/rhf-core) and [`@piplup/rhf-adapters`](https://www.npmjs.com/package/@piplup/rhf-adapters) | [piplupjs/piplup-react-hook-form](https://github.com/piplupjs/piplup-react-hook-form) |

## Still here

Two deprecated hook packages, kept only so existing installs keep resolving. Both have moved into
[`@piplup/utils`](https://github.com/piplupjs/piplup-utils) — use that instead.

- [`@piplup/use-event-listener`](./packages/use-event-listener/README.md) → `useEventListener` from
  `@piplup/utils`
- [`@piplup/use-local-storage`](./packages/use-local-storage/README.md) → `useLocalStorage` from
  `@piplup/utils`

Releases before 3.2.5 for every package above are in this repository's
[CHANGELOG](./CHANGELOG.md); later ones are in the changelog of whichever repository now owns the
package.
