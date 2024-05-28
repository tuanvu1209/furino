// @ts-nocheck
import { ThemeProvider } from '@mui/material';
import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Routers from './Routes/Routes.jsx';
import './index.css';
import store from './store';
import { theme } from './theme.jsx';
import ReactDOM from 'react-dom/client';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Toaster />
          <Routers />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
