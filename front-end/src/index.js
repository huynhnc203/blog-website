import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ChakraProvider } from '@chakra-ui/react';
import { AuthProvider } from './Components/LoginForm/CheckLogin';
import { IdProvider } from './Components/Page/BlogPage/SinglePage/SinglePageContext';

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
        <ChakraProvider>
          <AuthProvider>
            <IdProvider>
              <App />
            </IdProvider>
          </AuthProvider>
        </ChakraProvider>
  </React.StrictMode>
);
