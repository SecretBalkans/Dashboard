import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useAppContext } from "hooks/useAppContext";
import { chainsLogo } from "utils";

const CardBalanceDetails = ({ color }) => {
  const ctx = useAppContext();
  const [balance, setBalance] = useState({});

  useEffect(() => {
    const b = ctx.balances.data.bot_balances.filter(
      (bal) => bal.chain_id === ctx.chainSelected
    )[0];

    if (b !== undefined) {
      setBalance(b.balances);
    }
  }, [ctx.chainSelected, ctx.balances.data.bot_balances]);

  return (
    <>
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
          (color === "light" ? "bg-white" : "bg-lightBlue-900 text-white")
        }
      >
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full">
              <h3
                className={
                  "font-semibold text-lg " +
                  (color === "light" ? "text-blueGray-700" : "text-white")
                }
              >
                {ctx.chainSelected ? (
                  <div className="flex items-center w-full flex flex-row justify-stretch mb-0.5 uppercase">
                    <span>BALANCE FOR {ctx.chainSelected} </span>
                    <img
                      src={chainsLogo[ctx.chainSelected]}
                      className="h-12 w-12 bg-white rounded-full border ml-3"
                      alt="..."
                    ></img>
                  </div>
                ) : (
                  <div> - Please select a chain for balance - </div>
                )}
              </h3>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Tokens
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(balance).filter(k => +balance[k] > 0).map((k, i) => {
                return (
                  <tr key={`r_${i}`}>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap">
                      {k}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {balance[k]}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

CardBalanceDetails.defaultProps = {
  color: "light",
};

CardBalanceDetails.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};

export default CardBalanceDetails;
