import React from "react";
// components

// import CardLineChart from "components/Cards/CardLineChart.js";
// import CardBarChart from "components/Cards/CardBarChart.js";
import CardPageVisits from "components/Cards/CardPageVisits.js";

const Dashboard = () => {
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full xl:w-12/12 mb-12 xl:mb-0 px-4">
          <CardPageVisits />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
