import { Tab } from "@headlessui/react";
import { useState } from "react";

type ResponseDisplayProps = {
  data: any;
  headers: Record<string, string>;
  status: number;
  duration: number;
};

export default function ResponseDisplay({
  data,
  headers,
  status,
  duration,
}: ResponseDisplayProps) {
  const [selectedTab, setSelectedTab] = useState(0);

  const getStatusColor = (status: number) => {
    if (status >= 200 && status < 300) return "text-green-500";
    if (status >= 300 && status < 400) return "text-blue-500";
    if (status >= 400 && status < 500) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <div className="mt-8 space-y-4">
      <div className="flex items-center space-x-4">
        <span className={`text-lg font-bold ${getStatusColor(status)}`}>
          Status: {status}
        </span>
        <span className="text-gray-500">Time: {duration}ms</span>
      </div>

      <Tab.Group selectedIndex={selectedTab} onChange={setSelectedTab}>
        <Tab.List className="flex space-x-1 border-b">
          <Tab
            className={({ selected }) =>
              `px-4 py-2 focus:outline-none ${
                selected
                  ? "border-b-2 border-blue-500 text-blue-500"
                  : "text-gray-500 hover:text-gray-700"
              }`
            }
          >
            Response
          </Tab>
          <Tab
            className={({ selected }) =>
              `px-4 py-2 focus:outline-none ${
                selected
                  ? "border-b-2 border-blue-500 text-blue-500"
                  : "text-gray-500 hover:text-gray-700"
              }`
            }
          >
            Headers
          </Tab>
        </Tab.List>
        <Tab.Panels className="mt-4">
          <Tab.Panel>
            <pre className="p-4 bg-gray-50 rounded-md overflow-auto max-h-96 font-mono">
              {JSON.stringify(data, null, 2)}
            </pre>
          </Tab.Panel>
          <Tab.Panel>
            <div className="space-y-2">
              {Object.entries(headers).map(([key, value]) => (
                <div key={key} className="grid grid-cols-3 gap-4">
                  <div className="font-medium">{key}</div>
                  <div className="col-span-2 font-mono break-all">{value}</div>
                </div>
              ))}
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
