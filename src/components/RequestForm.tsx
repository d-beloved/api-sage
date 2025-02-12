import { FormEvent, useContext, useEffect, useState } from "react";
import { RequestData } from "@/types";
import { ResponseContext } from "@/ResponseContext";
import { errorScenarios, methodOptions } from "@/constants";

const RequestForm = () => {
  const respContext = useContext(ResponseContext);
  const [formData, setFormData] = useState<RequestData>({
    url: "",
    method: "GET",
    headers: "",
    body: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      url: `${window.location.origin}/api/test`,
    }));
  }, []);

  const handleMethodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newMethod = e.target.value;
    setFormData((data) => ({
      ...data,
      method: newMethod,
      headers: JSON.stringify(
        {
          "Content-Type": "application/json",
          Authorization: "Bearer mock-token",
        },
        null,
        2
      ),
    }));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const handleErrorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const errorCode = e.target.value;
    setFormData((data) => ({
      ...data,
      url: `${window.location.origin}/api/test${errorCode ? `?error=${errorCode}` : ""}`,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const headersObj = formData.headers ? JSON.parse(formData.headers) : {};

      const response = await fetch(formData.url, {
        method: formData.method,
        headers: headersObj,
        body: formData.method !== "GET" ? formData.body : null,
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

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-gray-500 rounded-lg shadow-md"
    >
      <h2 className="text-xl font-semibold mb-4">Make a Request</h2>
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
            {methodOptions.map((option: string, index: number) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400">
            Simulate Error
          </label>
          <select
            name="error"
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

        <div>
          <label className="block text-sm font-medium text-gray-400">
            Headers
          </label>
          <textarea
            name="headers"
            value={formData.headers}
            onChange={handleInputChange}
            placeholder='{ "Content-Type": "application/json" }'
            className="mt-1 block w-full p-2 border text-black border-gray-300 rounded-md"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400">
            Body
          </label>
          <textarea
            name="body"
            value={formData.body}
            onChange={handleInputChange}
            placeholder='{ "name": "John", "email": "john@example.com" }'
            className="mt-1 block w-full p-2 border text-black border-gray-300 rounded-md"
            rows={5}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          {isLoading ? "Sending..." : "Send Request"}
        </button>
      </div>
    </form>
  );
};

export default RequestForm;
