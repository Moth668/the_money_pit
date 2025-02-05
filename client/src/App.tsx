import React from 'react';
import { Outlet } from 'react-router-dom';
import { Provider } from "./components/ui/provider";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Header from './components/Header';
import Dashboard from "./pages/Dashboard";
import './App.css'
// import { ChakraProvider } from "@chakra-ui/react";

const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// Layout Component for Navigation and Main Content
const App: React.FC = () => {
  console.log("Current Route:", location.pathname); // Debugging
  return (
    <ApolloProvider client={client}>
      <Provider>
        <Header />
        <h1>The Money Pit</h1>
        <Dashboard />
        <Outlet />
      </Provider>
    </ApolloProvider>
  );
};

export default App;
