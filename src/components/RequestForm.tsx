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

const RequestForm = () => {
  const respContext = useContext(ResponseContext);
  const [formData, setFormData] = useState<RequestData>({
    url: "",
    method: "",
    headers: "",
    body: "",
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
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-gray-500 rounded-lg shadow-md"
    >
      <div className="space-y-4">
        <h2 className="text-xl font-semibold mb-4">Make a Request</h2>
        <AIXplain
          text="Explain this request"
          type={REQUEST}
          disabled={formData.method === ""}
          url={formData.url}
          method={formData.method}
          headers={formData.headers}
          body={formData.body}
        />
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-400">URL</label>
          <input
            type="text"
            value={formData.url}
            className="mt-1 block w-full p-2 border text-black border-gray-300 rounded-md"
            disabled
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400">
            Method
          </label>
          <select
            name="method"
            value={formData.method}
            onChange={handleMethodChange}
            className="mt-1 block w-full p-2 border text-black border-gray-300 rounded-md"
          >
            <option value="" disabled>
              Select an HTTP method
            </option>
            {methodOptions.map((option: string, index: number) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {formData.method !== "" && (
          <div>
            <label className="block text-sm font-medium text-gray-400">
              Simulate Different Scenarios
            </label>
            <select
              name="error"
              value={selectedError}
              className="mt-1 block w-full p-2 border text-black border-gray-300 rounded-md"
              onChange={handleErrorChange}
            >
              <option value="">Success</option>
              {errorScenarios.map((error) => (
                <option key={error.code} value={error.code}>
                  {error.code} - {error.name}
                </option>
              ))}
            </select>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-400">
            Headers
          </label>
          <textarea
            value={formData.headers}
            className="mt-1 block w-full p-2 border text-black border-gray-300 rounded-md"
            rows={8}
            readOnly
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400">
            Body
          </label>
          <textarea
            value={formData.body}
            className="mt-1 block w-full p-2 border text-black border-gray-300 rounded-md"
            rows={5}
            readOnly
          />
        </div>

        <button
          type="submit"
          disabled={shouldDisableSubmit}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:bg-blue-400"
        >
          {isLoading ? "Sending..." : "Send Request"}
        </button>
      </div>
    </form>
  );
};

export default RequestForm;
