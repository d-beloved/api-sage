import { FormEvent, useContext, useState } from "react";
import { RequestData } from "@/types";
import { ResponseContext } from "@/ResponseContext";

const methodOptions = [
  "GET",
  "HEAD",
  "OPTIONS",
  "POST",
  "PUT",
  "PATCH",
  "DELETE",
  "TRACE",
  "CONNECT",
];

const RequestForm = () => {
  const respContext = useContext(ResponseContext);
  const [formData, setFormData] = useState<RequestData>({
    url: "",
    method: "GET",
    headers: "",
    body: "",
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const headersObj = formData.headers ? JSON.parse(formData.headers) : {};

      const response = await fetch(formData.url, {
        method: formData.method,
        headers: headersObj,
        body: formData.method !== "GET" ? formData.body : null,
      });

      const data = await response.json();
      console.log("dare", data);
      respContext?.setResp(data);
    } catch (err) {
      if (err instanceof Response) {
        const errorData = await err.json();
        respContext?.setResp(errorData);
      } else {
        const errorMessage =
          err instanceof Error ? err.message : "An error occurred";
        setError(errorMessage);
        respContext?.setResp(errorMessage);
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
            name="url"
            value={formData.url}
            onChange={handleInputChange}
            placeholder="https://api.example.com/users"
            className="mt-1 block w-full p-2 border text-black border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400">
            Method
          </label>
          <select
            name="method"
            value={formData.method}
            onChange={handleInputChange}
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

        {error && <div className="text-red-600 text-sm">{error}</div>}

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
