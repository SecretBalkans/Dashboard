import React from "react";
import PropTypes from "prop-types";
import { useAppContext } from "hooks/useAppContext";
import { chainsLogo } from "utils";

const CardChains = ({ color }) => {
  const ctx = useAppContext();

  const chains = ctx.balances.data.bot_balances.reduce((acc, cur, idx) => {
    const col = 3;
    const chunkIdx = Math.floor(idx / col);

    if (!acc[chunkIdx]) {
      acc[chunkIdx] = [];
    }
    acc[chunkIdx].push(cur.chain_id);
    return acc;
  }, []);

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
            <tbody>
              {chains.map((chain, idx) => (
                <tr
                  key={`r_${idx}`}
                  className="flex flex-row justify-stretch ml-3 mb-5"
                >
                  {chain.map((c, i) => (
                    <th
                      key={`c_${i}`}
                      className="border-t-0 align-middle border-l-0 
                      border-r-0 text-xs whitespace-nowrap 
                      uppercase hover:tr flex items-center w-full"
                      onClick={() => ctx.setChainSelected(c)}
                    >
                      <img
                        src={chainsLogo[c]}
                        className="h-12 w-12 bg-white rounded-full border"
                        alt="..."
                      ></img>{" "}
                      <span
                        className={
                          "ml-3 font-bold" +
                          +(color === "light"
                            ? "text-blueGray-600"
                            : "text-white")
                        }
                      >
                        {c}
                      </span>
                    </th>
                  ))}
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
