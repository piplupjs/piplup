# @piplup/use-local-storage

![npm bundle size](https://img.shields.io/bundlephobia/minzip/@piplup/use-local-storage)

## ⚠️ Deprecation Warning

> **Important Notice:** `useLocalStorage` hook has been moved to [@piplup/utils](https://github.com/piplupjs/piplup/blob/main/packages/utils/README.md), While it may continue to work for existing projects, we recommend migrating to the new package.

`useLocalStorage` - Use your browser localStorage as a reactive storage. It's a hook for reading values from the browser localStorage and listening to changes in it. Any updates made to localStorage using the `setItem` and `removeItem` helper functions will trigger a state update for the useLocalStorage hook.

## Installation

```bash
npm install @piplup/use-local-storage

# or

yarn add @piplup/use-local-storage

# or

pnpm add @piplup/use-local-storage
```

## Usage

```jsx
import * as React from 'react';
import { useLocalStorage } from '@piplup/use-local-storage';

function App() {
  // Usage
  const value = useLocalStorage('myKey', 'defaultValue');

  return (
    <div>
      <p>Stored Value: {value}</p>
    </div>
  );
}
```

## API

### `useLocalStorage(key: string, initialValue: null | string = null): null | string`

A hook for reading from and listening to changes in `localStorage`.

- `key`: The key under which to store the value in `localStorage`.
- `initialValue`: The initial value to be used if no value is stored in `localStorage` under the specified key.

Returns the stored value or `null` if no value is stored.

### `getItem(key: string): null | string`

A wrapper around `localStorage.getItem`. On the server, `localStorage` is not available so a `null` value is returned. On the client side, the actual value will be read and returned.

### `setItem(key: string, value: string): void`

A wrapper around `localStorage.setItem`. On the server, `localStorage` is not available so no operation will be performed. On the client side, the value will be set in `localStorage`, and an event will be dispatched which will be helpful for triggering side effects in the `useLocalStorage` hook.

### `removeItem(key: string): void`

A wrapper around `localStorage.removeItem`. On the server, `localStorage` is not available so no operation will be performed. On the client side, the value will be removed from `localStorage`, and an event will be dispatched which will be helpful for triggering side effects in the `useLocalStorage` hook.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
