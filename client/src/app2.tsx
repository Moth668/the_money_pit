import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Provider } from "@/components/ui/provider";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
// import { Route } from 'react-router-dom';
// import Home from "./pages/Home";
// import MonthlyIncome from "./pages/MonthlyIncome";
// import MonthlyExpenses from "./pages/MonthlyExpenses";
// import CurrentSavings from "./pages/CurrentSavings";
// import InvestmentBalance from "./pages/InvestmentBalance";
// import AppNavbar from './components/Navbar'

const httpLink = createHttpLink({
  uri: '/graphql',
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

// Debug Component to Log Current Location
// const DebugLocation: React.FC = () => {
//   const location = useLocation();
//   console.log('Current Path:', location.pathname);
//   return null; // This component doesn't render anything on the UI
// };

// Layout Component for Navigation and Main Content
const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <Provider>
        <h1>The Money Pit</h1>
        {/* <AppNavbar /> */}
        {/* <DebugLocation /> */}
        <Outlet />
      </Provider>
      </ApolloProvider>
  );
};

export default App;
