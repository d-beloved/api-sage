import { ResponseContext } from "@/ResponseContext";
import { useContext } from "react";
import AIXplain from "./AIXplain";
import { defaultResponseData, RESPONSE } from "@/constants";

const APIResponse = () => {
  const responseContext = useContext(ResponseContext);
  const resp = responseContext?.resp;

  const disableAIExplanation =
    JSON.stringify(resp) === JSON.stringify(defaultResponseData);

  return (
    <div className="p-6 bg-gray-500 rounded-lg shadow-md">
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-4">Response</h2>
        <AIXplain
          text="Explain Response"
          type={RESPONSE}
          disabled={disableAIExplanation}
        />
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Status Code
          </label>
          <div className="mt-1 p-2 text-black bg-white border border-gray-300 rounded-md overflow-x-auto">
            {resp?.status}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Headers
          </label>
          <pre className="mt-1 p-2 text-black bg-white border border-gray-300 rounded-md overflow-x-auto">
            {JSON.stringify(resp?.headers, null, 2)}
          </pre>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Body
          </label>
          <pre className="mt-1 p-2 text-black bg-white border border-gray-300 rounded-md overflow-x-auto">
            {JSON.stringify(resp?.body, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default APIResponse;
