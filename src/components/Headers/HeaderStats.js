import React from "react";
import { ApolloConsumer } from "@apollo/client";
import { useAppContext } from "hooks/useAppContext";

import CardBotStats from "components/Cards/CardBotStats.js";
import CardStats from "components/Cards/CardStats";

const HeaderStats = () => {
  const ctx = useAppContext();

  return (
    <ApolloConsumer>
      {(props) => (
        <div className="relative bg-lightBlue-600 md:pt-32 pb-32 pt-12">
          <div className="px-4 md:px-10 mx-auto w-full">
            <div>
              {/* Card stats */}
              <div className="flex flex-wrap">
                <div className="w-full lg:w-6/12 xl:w-6/12 px-4">
                <CardStats
                  statSubtitle="BOT NAME"
                  statTitle="SHADBOT"
                  statArrow="down"
                  statPercent="1.10"
                  statPercentColor="text-orange-500"
                  statDescripiron="Total PNL"
                  statIconName="fas fa-hippo"
                  statIconColor="bg-pink-500"
                />
                </div>
                <div className="w-full lg:w-6/12 xl:w-6/12 px-4">
                  <CardBotStats
                    statSubtitle="Bot status"
                    statTitle={ctx.botStatus ? "RUNNING" : "STOPPED"}
                    statIconName="far fa-star"
                    statIconColor="bg-red-500"
                    botStatus={ctx.botStatus}
                    setBotStatus={ctx.setBotStatus}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </ApolloConsumer>
  );
};

export default HeaderStats;
