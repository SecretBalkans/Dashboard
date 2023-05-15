import React from "react";
import { gql, useSubscription } from "@apollo/client";

const CardPrettyJson = ({ data }) => (
  <div className="flex flex-wrap mt-4">
    <div className="w-full mb-2 px-4">
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
        <div className="px-6 overflow-auto">
          <div className="flex flex-wrap">
            <div className="w-full px-4 flex">
              <pre>{JSON.stringify(data, null, 4)}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const RunLogs = () => {
  const RUNLOGS_SUBSCRIPTION = gql`
    subscription GetRunsStreamingSubscription {
      runs {
        id
        bot_id
        arb
        ops
        created_at
        updated_at
      }
    }
  `;

  const runlogs = useSubscription(RUNLOGS_SUBSCRIPTION, {
    context: {
      clientName: "bot",
    },
  });

  if (runlogs.loading) return <div>Loading runlogs...</div>;
  if (runlogs.error || !runlogs.data)
    return <div>RunLogs error! No subscription service!</div>;

  return <CardPrettyJson data={runlogs.data} />;
};

export default RunLogs;
