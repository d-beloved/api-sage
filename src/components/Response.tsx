const APIResponse = () => {
  return (
    <div className="p-6 bg-gray-500 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Response</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Status Code
          </label>
          <div className="mt-1 p-2 text-black bg-white border border-gray-300 rounded-md">
            200 OK
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Headers
          </label>
          <pre className="mt-1 p-2 text-black bg-white border border-gray-300 rounded-md overflow-x-auto">
            {JSON.stringify({ "content-type": "application/json" }, null, 2)}
          </pre>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Body
          </label>
          <pre className="mt-1 p-2 text-black bg-white border border-gray-300 rounded-md overflow-x-auto">
            {JSON.stringify({ message: "Request successful" }, null, 2)}
          </pre>
        </div>

        <button className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700">
          Explain Response
        </button>
      </div>
    </div>
  );
};

export default APIResponse;
