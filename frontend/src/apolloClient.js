// frontend/src/apolloClient.js
import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:8000/graphql', // Your PHP GraphQL server
  cache: new InMemoryCache(),           // Enables caching of query results
});

export default client;
