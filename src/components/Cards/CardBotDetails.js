import React from "react";
import { useAppContext } from "hooks/useAppContext";
import { fixNumber } from "utils";
import moment from "moment";

const CardBotDetails = () => {
  const ctx = useAppContext();

  return (
    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
      <div className="rounded-t mb-0 px-4 py-3 border-0">
        <div className="flex flex-wrap items-center">
          <div className="relative w-full px-4 max-w-full flex-grow flex-1">
            <h3 className="font-semibold text-base text-blueGray-700">
              ARBITRAGE
            </h3>
          </div>
          <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
            <button
              className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
            >
              See all
            </button>
          </div>
        </div>
      </div>
      <div className="block w-full overflow-x-auto">
        {/* Projects table */}
        <table className="items-center w-full bg-transparent border-collapse">
          <thead>
            <tr>
              <th className="px-3 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                Dex 0 :: Dex 1
              </th>
              <th className="px-3 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                Tkn 0 :: Tkn 1
              </th>
              <th className="px-3 bg-blueGray-50 text-orange-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                Amnt win
              </th>
              <th className="px-3 bg-blueGray-50 text-orange-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                % win
              </th>
              <th className="px-3 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                Amnt in
              </th>
              <th className="px-3 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                Amnt bridge
              </th>
              <th className="px-3 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                Amnt out
              </th>
              <th className="px-3 bg-blueGray-50 text-orange-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                block delay
              </th>
              <th className="px-3 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                last ts
              </th>
              <th className="px-3 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                ts
              </th>
              <th className="px-3 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                Route 0
              </th>
              <th className="px-3 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                Route 1
              </th>
              <th className="px-3 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                ID
              </th>
            </tr>
          </thead>
          <tbody>
            { Object.values(ctx.heights).reduce((__, _, i) => {
              if(i === Object.values(ctx.heights).length -1) {
                return ctx.monitor.arb_v1.map(row => ({...row, winUsd: row.amount_win * ctx.prices[row.token_0.toUpperCase()]})).sort((a,b) => b.winUsd - a.winUsd).map((row, i) => (
                  <tr key={"i_" + i}>
                    <td className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {`${row.dex_0} :: ${row.dex_1}`}
                    </td>
                    <td className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {`${row.token_0} :: ${row.token_1}`}
                    </td>
                    <td
                      className="border-t-0 px-3 align-middle text-left text-orange-500 font-bold border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      ${fixNumber(row.winUsd, {
                        minimumFractionNonZeroDigits: 2, maximumFractionNonZeroDigits: 2})}&nbsp;&nbsp;({+fixNumber(row.amount_win, {minimumFractionNonZeroDigits: 2, maximumFractionNonZeroDigits: 3})})
                    </td>
                    <td
                      className="border-t-0 px-3 align-middle text-right text-orange-500 font-bold border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {fixNumber((row.amount_win / row.amount_in) * 100, {minimumFractionNonZeroDigits: 2, maximumFractionNonZeroDigits: 3})}%
                    </td>
                    <td
                      className="border-t-0 px-3 align-middle text-right border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {fixNumber(row.amount_in, {minimumFractionNonZeroDigits: 2, maximumFractionNonZeroDigits: 3})}
                    </td>
                    <td
                      className="border-t-0 px-3 align-middle text-right border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {fixNumber(row.amount_bridge, {minimumFractionNonZeroDigits: 2, maximumFractionNonZeroDigits: 3})}
                    </td>
                    <td
                      className="border-t-0 px-3 align-middle text-right border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {fixNumber(row.amount_out, {minimumFractionNonZeroDigits: 2, maximumFractionNonZeroDigits: 3})}
                    </td>
                    <td
                      className="border-t-0 align-middle text-orange-500 font-bold border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {ctx.heights[row.dex_0] - row.height_0} :: {ctx.heights[row.dex_1] - row.height_1}
                    </td>
                    <td className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {moment(row.last_ts).format("HH:mm ll")}
                    </td>
                    <td className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {moment(row.ts).format("HH:mm ll")}
                    </td>
                    <td className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {(row.route_0?.raws || row.route_0).join('::')}
                    </td>
                    <td className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {(row.route_1?.raws || row.route_1).join('::')}
                    </td>
                    <td className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {row.id}
                    </td>
                  </tr>
                ));
              }
            }, 0)}
          </tbody>
        </table>
      </div>
    </div>
  );
}


export default CardBotDetails;
