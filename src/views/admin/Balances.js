import React from "react";

// components

import CardChains from "components/Cards/CardChains.js";
import CardBalanceDetails from "components/Cards/CardBalanceDetails";

export default function Balances() {
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-2 px-4">
          <CardChains />
        </div>
        <div className="w-full px-4">
          <CardBalanceDetails color="dark"/>
        </div>
      </div>
    </>
  );
}
