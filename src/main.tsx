import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import store from './store/store';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MantineProvider
      withCSSVariables
      withGlobalStyles
      withNormalizeCSS
      theme={{ globalStyles: (theme) => ({ pre: { whiteSpace: 'pre-wrap' } }) }}
    >
      <Notifications />
      <Provider store={store}>
        <ModalsProvider>
          <App />
        </ModalsProvider>
      </Provider>
    </MantineProvider>
  </React.StrictMode>
);
