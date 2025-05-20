import moment from "moment";

import PingEffect from "./ping-effect";
import getApiClient from "@/lib/api-client";
import NewMonitor from "./new-monitor";

export default async function MonitoringSection() {
  const apiClient = await getApiClient();
  const response = await apiClient.get("/monitor");
  const monitors: IMonitor[] = response.data;

  return (
    <section className="px-5 pt-2.5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold mb-4">Your Monitors</h2>
        <NewMonitor />
      </div>

      <div>
        {monitors.length > 0 ? (
          <ul className="space-y-4">
            {monitors.map((monitor) => (
              <li
                key={monitor.id}
                className="bg-white shadow-sm rounded-lg p-4 flex justify-between items-center"
              >
                <div className="flex items-center gap-8">
                  <PingEffect isUp={monitor.logs[0].isUp} />
                  <div className="space-y-2">
                    <p className="font-medium">{monitor.url}</p>
                    <p className="text-sm text-gray-500">
                      Last pinged:&nbsp;
                      {moment(monitor.lastPingedAt, "YYYYMMDD").fromNow()}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No active monitors found</p>
        )}
      </div>
    </section>
  );
}
