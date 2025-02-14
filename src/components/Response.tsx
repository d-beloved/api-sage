import { useContext } from "react";
import { ResponseContext } from "@/ResponseContext";
import AIXplain from "./AIXplain";
import { defaultResponseData, RESPONSE } from "@/constants";
import JSONTab from "./JSONTab";

const APIResponse = () => {
  const responseContext = useContext(ResponseContext);
  const resp = responseContext?.resp;

  const disableAIExplanation =
    JSON.stringify(resp) === JSON.stringify(defaultResponseData);

  return (
    <div className="p-3 sm:p-4 md:p-6 bg-gray-700 rounded-lg shadow-xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-3 sm:space-y-0 mb-4">
        <div
          className={`px-3 sm:px-6 py-2 sm:py-4 rounded-lg sm:rounded-full ${
            resp?.status.toString().startsWith("2")
              ? "bg-green-600"
              : resp?.status.toString().startsWith("4")
                ? "bg-yellow-600"
                : resp?.status.toString().startsWith("5")
                  ? "bg-red-600"
                  : "bg-gray-600"
          }`}
        >
          <h2 className="text-lg sm:text-2xl font-mono text-white">
            {resp?.status}
          </h2>
        </div>
        <div className="sm:ml-4">
          <AIXplain type={RESPONSE} disabled={disableAIExplanation} />
        </div>
      </div>

      <div className="mt-4 sm:mt-6">
        <JSONTab
          Tabs={[
            { name: "Response", content: JSON.stringify(resp, null, 2) },
            {
              name: "Headers",
              content: JSON.stringify(resp?.headers, null, 2),
            },
            { name: "Body", content: JSON.stringify(resp?.body, null, 2) },
          ]}
        />
      </div>
    </div>
  );
};

export default APIResponse;
