import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from "redux-persist/integration/react";
import { createRoot } from 'react-dom/client';

import App from './App';
import { store, persistor } from './GlobalState/Store';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);