import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import store from './redux/store';
import { injectStore } from './api/axiosInstance';
import { injectStorePrivate } from './api/axiosPrivate';
import App from './App';

injectStore(store);
injectStorePrivate(store);

// -------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
