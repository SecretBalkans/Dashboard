import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";
import Admin from "layouts/Admin.js";

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
      height_0
      height_1
    }
  }
`;
const PRICES_SUBSCRIPTION = gql`
    subscription {
        prices {
            prices
        }
    }
`;

const HEIGHTS_SUBSCRIPTION = gql`
    subscription heights {
            heights {
                dex
                height
                updated_at
            }
    }`;

const BOT_SUBSCRIPTION = gql`
  subscription bot_subscription {
    bot_v1 {
      status
      reported_status
      supervisor_reported_ts
      pnl
      name
      id
    }
  }
`;

const BALANCE_SUBSCRIPTION = gql`
  subscription bot_balance {
    bot_balances {
      chain_id
      bot_id
      balances
      id
    }
  }
`;


const App = ({ children }) => {
  const [chainSelected, setChainSelected] = useState("");

  const ctx = {
    setChainSelected,
    chainSelected,
  };

  useEffect(() => {
    setChainSelected(chainSelected);
  }, [chainSelected]);

  const monitor = useSubscription(MONITOR_SUBSCRIPTION);

  const heights = useSubscription(HEIGHTS_SUBSCRIPTION);

  const prices = useSubscription(PRICES_SUBSCRIPTION);

  const bot = useSubscription(BOT_SUBSCRIPTION, {
    context: {
      clientName: "bot",
    },
  });

  const balance = useSubscription(BALANCE_SUBSCRIPTION, {
    context: {
      clientName: "bot",
    },
  });


  if (monitor.loading) return <div>Loading monitor...</div>;
  if (monitor.error || !monitor.data)
    return <div>Monitor error! No subscription service!</div>;

  if (bot.loading) return <div>Loading bot...</div>;
  if (bot.error || !bot.data)
    return <div>Bot error! No subscription service!</div>;

  if (balance.loading) return <div>Loading balance...</div>;
  if (balance.error || !balance.data)
    return <div>Balance error! No subscription service!</div>;

  return (
    <AppContextProvider
      value={{
        ...ctx,
        monitor: { ...monitor.data },
        bot: { ...bot.data },
        balances: { ...balance },
        heights: heights.data?.heights.reduce((agg, {dex, height}) => {
          agg[dex] = height;
          return agg;
        }, {}),
        prices: prices.data.prices[0].prices,
      }}
    >
      <Routes>
        <Route path="/admin" element={<Admin />} />
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
