import React, { useEffect } from 'react';
import axios from 'axios';

const App = () => {
  useEffect(() => {
    const query = `
      query Echo($message: String!) {
        echo(message: $message)
      }
    `;

    axios
      .post('http://localhost:8000/graphql', {
        query: query,
        variables: { message: 'Hello from React!' },
      })
      .then((response) => {
        console.log('Response from GraphQL:', response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <h1>Test</h1>
    </div>
  );
};

export default App;
