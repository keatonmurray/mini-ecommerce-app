import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ApolloProvider } from '@apollo/client';
import client from './apollo';
import './assets/css/style.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

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
