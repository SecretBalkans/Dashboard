import React from "react";
import CardBotDetails from "components/Cards/CardBotDetails.js";

const Dashboard = () => {
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full xl:w-12/12 mb-12 xl:mb-0 px-4">
          <CardBotDetails />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
