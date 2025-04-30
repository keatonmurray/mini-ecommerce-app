import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ApolloProvider } from '@apollo/client'
import client from './apollo'
import './assets/css/style.css';
import Home from './pages/Home'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App>
        <Home />
      </App>
    </ApolloProvider>
  </React.StrictMode>,
)
