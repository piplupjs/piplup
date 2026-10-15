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
- `children` (optional): The child components to render within the cache buster.

## How It Works

`CacheBuster` fetches a release ID from `/RELEASE` at the root of your site (the file generated in your public folder). It then compares this ID with the one stored in the browser's local storage. If a new release is detected, it reloads the page. Otherwise, it proceeds to render the child components.

## Contributing

Contributions are welcome! Feel free to submit issues or pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
