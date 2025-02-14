import { FormEvent, useContext, useEffect, useState } from "react";
import { RequestData } from "@/types";
import { ResponseContext } from "@/ResponseContext";
import {
  defaultResponseData,
  errorScenarios,
  methodOptions,
  methodTemplates,
  REQUEST,
} from "@/constants";
import AIXplain from "./AIXplain";
import JSONTab from "./JSONTab";

const RequestForm = () => {
  const respContext = useContext(ResponseContext);
  const [formData, setFormData] = useState<RequestData>({
    url: "",
    method: "",
    headers: "{}",
    body: "{}",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedError, setSelectedError] = useState<string>("");

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      url: `${window.location.origin}/api/testhttpmethod`,
    }));
  }, []);

  const handleMethodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newMethod = e.target.value;
    setSelectedError("");
    setFormData((data) => ({
      ...data,
      url: `${window.location.origin}/api/testhttpmethod`,
      method: newMethod,
      headers: JSON.stringify(
        methodTemplates.headers[
          newMethod as keyof typeof methodTemplates.headers
        ] || {},
        null,
        2
      ),
      body: JSON.stringify(
        methodTemplates.bodies[
          newMethod as keyof typeof methodTemplates.bodies
        ] || {},
        null,
        2
      ),
    }));
    respContext?.setResp({ ...defaultResponseData });
  };

  const handleErrorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const errorCode = e.target.value;
    setSelectedError(errorCode);
    setFormData((data) => ({
      ...data,
      url: `${window.location.origin}/api/testhttpmethod${errorCode ? `?error=${errorCode}` : ""}`,
    }));
    respContext?.setResp({ ...defaultResponseData });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const headersObj = formData.headers ? JSON.parse(formData.headers) : {};

      const response = await fetch(formData.url, {
        method: formData.method,
        headers: headersObj,
        body: ["GET", "DELETE"].includes(formData.method)
          ? null
          : formData.body,
      });

      const data = await response.json();
      respContext?.setResp(data);
    } catch (err) {
      if (err instanceof Response) {
        const errorData = await err.json();
        respContext?.setResp(errorData);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const shouldDisableSubmit = formData.method === "" || isLoading;

  return (
    <div className="space-y-4 px-4 sm:px-0 w-full max-w-full lg:max-w-2xl mx-auto">
      <div className="flex flex-wrap gap-2 mb-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
        {methodOptions.map((option: string) => (
          <button
            key={option}
            onClick={() =>
              handleMethodChange({ target: { value: option } } as any)
            }
            className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-t-lg text-xs sm:text-sm whitespace-nowrap ${
              formData.method === option
                ? "bg-blue-600 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      <form
        onSubmit={handleSubmit}
        className="p-4 sm:p-4 md:p-6 bg-gray-700 rounded-lg shadow-xl"
      >
        <div className="mb-4">
          <AIXplain
            type={REQUEST}
            disabled={formData.method === ""}
            url={formData.url}
            method={formData.method}
            headers={formData.headers}
            body={formData.body}
          />
        </div>
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 bg-gray-800 p-2 rounded-lg">
            <span className="px-2 sm:px-3 py-1 rounded-md bg-blue-600 text-white font-mono text-xs sm:text-sm whitespace-nowrap">
              {formData.method || "HTTP METHOD"}
            </span>
            <input
              type="text"
              value={formData.url}
              className="w-full flex-1 bg-transparent border-0 text-white focus:ring-0 text-xs overflow-x-auto scrollbar-thin scrollbar-thumb-gray-600"
              disabled
            />
          </div>

          {formData.method !== "" && (
            <div className="mt-2 sm:mt-4">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div
                  className={`w-5 sm:w-7 h-5 sm:h-7 rounded-full flex-shrink-0 ${selectedError.startsWith("4") ? "bg-yellow-600" : selectedError.startsWith("5") ? "bg-red-600" : "bg-green-500"}`}
                ></div>

                <select
                  value={selectedError}
                  className="w-full bg-gray-800 text-white border-0 rounded-md py-2 sm:py-3 px-2 text-xs sm:text-sm focus:outline-none"
                  onChange={handleErrorChange}
                >
                  <option value="">Success - (200)</option>
                  {errorScenarios.map((error) => (
                    <option key={error.code} value={error.code}>
                      {error.name} - {error.code}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          <JSONTab
            Tabs={[
              { name: "Request Headers", content: formData.headers },
              { name: "Request Body", content: formData.body },
            ]}
          />

          <button
            type="submit"
            disabled={shouldDisableSubmit}
            className="w-full bg-blue-600 text-white py-2 sm:py-3 rounded-lg hover:bg-blue-700
             disabled:bg-gray-600 disabled:cursor-not-allowed
             flex items-center justify-center space-x-2 text-sm sm:text-base"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 sm:h-5 w-4 sm:w-5 border-b-2 border-white" />
                <span>Sending...</span>
              </>
            ) : (
              <span>Send Request </span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RequestForm;
