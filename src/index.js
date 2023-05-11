import React from "react";
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
  ApolloLink,
  ApolloProvider,
  InMemoryCache,
  gql,
  useSubscription,
} from "@apollo/client";

import { createClient } from "graphql-ws";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";

const monitorLink = new GraphQLWsLink(
  createClient({
    url: process.env.REACT_APP_MONITOR_HASURA,
    reconnect: true,
  })
);

const botLink = new GraphQLWsLink(
  createClient({
    url: process.env.REACT_APP_BOT_HASURA,
    reconnect: true,
  })
);

const client = new ApolloClient({
  link: ApolloLink.split(
    (operation) => operation.getContext().clientName === "bot",
    botLink,
    monitorLink
  ),
  cache: new InMemoryCache(),
});

const MONITOR_SUBSCRIPTION = gql`
  subscription winning_arbs {
    arb_v1(where: { amount_win: { _gt: 0 } }, order_by: { amount_win: desc }) {
      amount_win
      token_0
      token_1
      dex_0
      dex_1
      route_0
      route_1
      id
      ts
      last_ts
      amount_in
      amount_out
      amount_bridge
    }
  }
`;

const BOT_SUBSCRIPTION = gql`
subscription bot_subscription {
  bot_v1 {
    status
		pnl
		name
		id
  }
}`

const App = ({ children }) => {
  const ctx = {};


  const monitor = useSubscription(MONITOR_SUBSCRIPTION);
  const bot = useSubscription(BOT_SUBSCRIPTION, {
    context: {
      clientName: "bot"
    }
  });


  if (monitor.loading) return <div>Loading monitor...</div>;
  if (monitor.error || !monitor.data) return <div>Monitor error! No subscription service!</div>;

  if (bot.loading) return <div>Loading bot...</div>;
  if (bot.error || !bot.data) return <div>Bot error! No subscription service!</div>;

  // console.log(mdata);
  // console.log(bot.data);

  return (
    <AppContextProvider
      value={{
        ...ctx,
        monitor: { ...monitor.data },
        bot: {...bot.data}
      }}
    >
      <Routes>
        {/* add routes with layouts */}
        <Route path="/admin" element={<Admin />} />
        {/* <Route path="/landing" exact component={Landing} /> */}
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
