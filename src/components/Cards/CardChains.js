import React from "react";
import PropTypes from "prop-types";
import { useAppContext } from "hooks/useAppContext";

const CardChains = ({ color }) => {
  const ctx = useAppContext();
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
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3
                className={
                  "font-semibold text-lg " +
                  (color === "light" ? "text-blueGray-700" : "text-white")
                }
              >
                Chains List
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
                    "border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left uppercase " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Chains
                </th>
              </tr>
            </thead>
            <tbody>
              {ctx.balances.data.bot_balances.map((balance) => (
                <tr
                  key={balance.id}
                  className="hover:tr"
                  onClick={() => ctx.setChainSelected(balance.chain_id)}
                >
                  <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center uppercase">
                    {/* <img
                    src={"/secretLogo.png"}
                    className="h-12 w-12 bg-white rounded-full border"
                    alt="..."
                  ></img>{" "} */}
                    <span
                      className={
                        "ml-3 font-bold" +
                        +(color === "light"
                          ? "text-blueGray-600"
                          : "text-white")
                      }
                    >
                      {balance.chain_id}
                    </span>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

CardChains.defaultProps = {
  color: "light",
};

CardChains.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};

export default CardChains;
