import React from "react";
import PropTypes from "prop-types";
import { ApolloConsumer, gql } from "@apollo/client";
export default function CardBotStats({
  statSubtitle,
  statTitle,
  statArrow,
  statPercent,
  statPercentColor,
  statDescripiron,
  statIconName,
  statIconColor,
  botStatus,
  botId,
}) {

  const SET_BOT_STATUS = gql`
  mutation {
    update_bot_v1(where: {id: {_eq: "${botId}"}}, _set: {status: ${!botStatus}}) {
      affected_rows
      returning {
        id
        status
      }
    }
  }
  `;

  return (
    <ApolloConsumer>
      {(client) => (
        <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
          <div className="flex-auto p-4">
            <div className="flex flex-wrap">
              <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                  {statSubtitle}
                </h5>
                <span className="font-semibold text-xl text-blueGray-700">
                  {statTitle}
                </span>
              </div>
              <button
                className="bg-lightBlue-600 text-white active:bg-lightBlue-800 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
                type="button"
                onClick={() => {
                  client.mutate({
                    mutation: SET_BOT_STATUS,

                    context: {
                      clientName: "bot",
                    },
                  });
                }}
              >
                {botStatus ? "STOP" : "START"} BOT
              </button>
              <div className="relative w-auto pl-4 flex-initial">
                <div
                  className={
                    "text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full " +
                    statIconColor
                  }
                >
                  <i className={statIconName}></i>
                </div>
              </div>
            </div>
            <p className="text-sm text-blueGray-400">
              <span className="whitespace-nowrap">&nbsp;</span>
            </p>
          </div>
        </div>
      )}
    </ApolloConsumer>
  );
}

CardBotStats.defaultProps = {
  statSubtitle: "Traffic",
  statTitle: "350,897",
  statArrow: "up",
  statPercent: "3.48",
  statPercentColor: "text-emerald-500",
  statDescripiron: "Since last month",
  statIconName: "far fa-chart-bar",
  statIconColor: "bg-red-500",
};

CardBotStats.propTypes = {
  statSubtitle: PropTypes.string,
  statTitle: PropTypes.string,
  statArrow: PropTypes.oneOf(["up", "down"]),
  statPercent: PropTypes.string,
  // can be any of the text color utilities
  // from tailwindcss
  statPercentColor: PropTypes.string,
  statDescripiron: PropTypes.string,
  statIconName: PropTypes.string,
  // can be any of the background color utilities
  // from tailwindcss
  statIconColor: PropTypes.string,
};
