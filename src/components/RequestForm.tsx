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
    <div className="space-y-6">
      <div className="flex space-x-2 overflow-x-auto">
        {methodOptions.map((option: string) => (
          <button
            key={option}
            onClick={() =>
              handleMethodChange({ target: { value: option } } as any)
            }
            className={`px-4 py-2 rounded-t-lg ${
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
        className="p-6 bg-gray-700 rounded-lg shadow-xl"
      >
        <div className="space-y-4 mb-2">
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
          <div className="flex items-center space-x-2 bg-gray-800 p-2 rounded-lg">
            <span className="px-3 py-1 rounded-md bg-blue-600 text-white font-mono">
              {formData.method || "HTTP METHOD"}
            </span>
            <input
              type="text"
              value={formData.url}
              className="flex-1 bg-transparent border-0 text-white focus:ring-0"
              disabled
            />
          </div>

          {formData.method !== "" && (
            <div className="mt-4">
              <div className="flex items-center space-x-3">
                <div
                  className={`w-7 h-7 rounded-full ${selectedError.startsWith("4") ? "bg-yellow-600" : selectedError.startsWith("5") ? "bg-red-600" : "bg-green-500"}`}
                ></div>

                <select
                  value={selectedError}
                  className="bg-gray-800 text-white border-0 rounded-md py-3 px-2 w-full focus:outline-none"
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
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700
             disabled:bg-gray-600 disabled:cursor-not-allowed
             flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
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
