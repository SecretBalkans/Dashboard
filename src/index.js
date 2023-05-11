import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";
// layouts
import Admin from "layouts/Admin.js";
// import Auth from "layouts/Auth.js";

// views without layouts
// import Landing from "views/Landing.js";
// import Profile from "views/Profile.js";
// import Index from "views/Index.js";

import { AppContextProvider } from "./hooks/useAppContext";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  gql,
  useSubscription,
} from "@apollo/client";

import { createClient } from "graphql-ws";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";

const link = new GraphQLWsLink(
  createClient({
    url: process.env.REACT_APP_LOCAL_HASURA,
  })
);

const cache = new InMemoryCache();
const client = new ApolloClient({
  link,
  cache,
});

const DATABASE_SUBSCRIPTION = gql`
  subscription {
    temperature(order_by: { recorded_at: asc }) {
      location
      temperature
      recorded_at
    }
  }
`;

const App = ({ children }) => {
  const [botStatus, setBotStatus] = useState(false);
  const ctx = {
    botStatus,
    setBotStatus,
  };

  useEffect(() => {
    //fetch the bot status from the bot endpoint
    //setBotStatus(data.status);
    
    console.log("botStatus fetched")

  }, [botStatus])

  const { data, loading, error } = useSubscription(DATABASE_SUBSCRIPTION);
  if (loading) return <div>Loading...</div>;
  if (error || !data) return <div>Error! No subscription service!</div>;

  console.log(data)
  
  return (
    <AppContextProvider
      value={{
        ...ctx,
      }}
    >
      <Routes>
        {/* add routes with layouts */}
        <Route path="/admin" element={<Admin />} />
        {/* <Route path="/auth" component={Auth} /> */}
        {/* add routes without layouts */}
        {/* <Route path="/landing" exact component={Landing} /> */}
        {/* <Route path="/profile" exact component={Profile} /> */}
        {/* <Route path="/" exact component={Index} /> */}
        <Route path="*" element={<Admin />} />
      </Routes>
    </AppContextProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>
);
