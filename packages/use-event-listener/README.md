# @piplup/use-event-listener

![npm bundle size](https://img.shields.io/bundlephobia/minzip/@piplup/use-event-listener)

## ⚠️ Deprecation Warning

> **Important Notice:** `useEventListener` hook has been moved to [@piplup/utils](https://github.com/piplupjs/piplup/blob/main/packages/utils/README.md), While it may continue to work for existing projects, we recommend migrating to the new package.

`useEventListener` is a custom React hook designed to simplify the process of adding event listeners to various DOM elements in React applications.

## Installation

You can install `useEventListener` via npm or yarn:

```bash
npm install @piplup/use-event-listener

# or

yarn add @piplup/use-event-listener

# or

pnpm add @piplup/use-event-listener
```

## Usage

```jsx
'use client';

import * as React from 'react';
import { useEventListener } from '@piplup/use-event-listener';

function App() {
  const handleResize = (event) => {
    console.log('Window has been resized!', event);
  };

  useEventListener('resize', handleResize);

  return <div>useEventListener Demo</div>;
}
```

## API

### `useEventListener(eventName, handler, element, options)`

- `eventName` (`string`): The name of the event to listen for, such as `'click'`, `'resize'`, etc.
- `handler` (`function`): The event handler function that will be called when the event is triggered.
- `element` (`RefObject`): A React ref object referencing the DOM element to which the event listener will be attached. If not provided, the event listener will be attached to the `window` object.
- `options` (`AddEventListenerOptions | boolean`, optional): Additional options to pass to the `addEventListener` function.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
