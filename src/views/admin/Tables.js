import React from "react";

// components

import CardTable from "components/Cards/CardTable.js";
import CardBalanceDetails from "components/Cards/CardBalanceDetails";

export default function Tables() {
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-2 px-4">
          <CardTable />
        </div>
        <div className="w-full px-4">
          <CardBalanceDetails color="dark"/>
        </div>
      </div>
    </>
  );
}
