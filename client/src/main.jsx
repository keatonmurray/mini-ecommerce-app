import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import client from './apollo';
import './assets/css/style.css';
import './assets/css/media.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";

import App from './App';
import Home from './pages/Home'; 
import SingleProduct from './pages/SingleProduct';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          {/* Home Route */}
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
          </Route>
          {/* Product Route */}
          <Route path="/product" element={<App />}>
            <Route index element={<SingleProduct />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>
);
