import React from "react";
import { useAppContext } from "hooks/useAppContext";

import CardBotStats from "components/Cards/CardBotStats.js";
import CardStats from "components/Cards/CardStats";

const HeaderStats = () => {
  const ctx = useAppContext();
  const BOT = ctx.bot.bot_v1[0];

  return (
    <div className="relative bg-lightBlue-600 md:pt-32 pb-32 pt-12">
      <div className="px-4 md:px-10 mx-auto w-full">
        <div>
          {/* Card stats */}
          <div className="flex flex-wrap">
            <div className="w-full lg:w-6/12 xl:w-6/12 px-4">
              <CardStats
                statSubtitle={`ID: ${BOT.id}`}
                statTitle={`Name: ${BOT.name.toUpperCase()}`}
                statArrow="down"
                statPercent={BOT.pln || '0'}
                statPercentColor="text-orange-500"
                statDescripiron="Total PNL"
                statIconName="fas fa-hippo"
                statIconColor="bg-pink-500"
              />
            </div>
            <div className="w-full lg:w-6/12 xl:w-6/12 px-4">
              <CardBotStats
                statSubtitle="Bot status"
                statTitle={BOT.status ? "RUNNING" : "STOPPED"}
                statIconName="far fa-star"
                statIconColor="bg-red-500"
                botStatus={BOT.status}
                botId={BOT.id}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderStats;
