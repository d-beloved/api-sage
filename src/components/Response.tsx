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
    <div className="p-6 bg-gray-700 rounded-lg shadow-xl">
      <div
        className={`px-6 py-4 ${
          resp?.status.toString().startsWith("2")
            ? "bg-green-600"
            : resp?.status.toString().startsWith("4")
              ? "bg-yellow-600"
              : resp?.status.toString().startsWith("5")
                ? "bg-red-600"
                : "bg-gray-600"
        }`}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-mono text-white">{resp?.status}</h2>
          {/* <AIXplain
            text="Explain Response"
            type={RESPONSE}
            disabled={disableAIExplanation}
          /> */}
        </div>
      </div>

      <JSONTab
        Tabs={[
          { name: "Response", content: JSON.stringify(resp, null, 2) },
          { name: "Headers", content: JSON.stringify(resp?.headers, null, 2) },
          { name: "Body", content: JSON.stringify(resp?.body, null, 2) },
        ]}
      />
    </div>
  );
};

export default APIResponse;
