const RequestForm = () => {
  return (
    <div className="p-6 bg-gray-500 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Make a Request</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-400">URL</label>
          <input
            type="text"
            placeholder="https://api.example.com/users"
            className="mt-1 block w-full p-2 border text-black border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400">
            Method
          </label>
          <select className="mt-1 block w-full p-2 border text-black border-gray-300 rounded-md">
            <option value="GET">GET</option>
            <option value="HEAD">HEAD</option>
            <option value="OPTIONS">OPTIONS</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="PATCH">PATCH</option>
            <option value="DELETE">DELETE</option>
            <option value="TRACE">TRACE</option>
            <option value="CONNECT">CONNECT</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400">
            Headers
          </label>
          <textarea
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
            placeholder='{ "name": "John", "email": "john@example.com" }'
            className="mt-1 block w-full p-2 border text-black border-gray-300 rounded-md"
            rows={5}
          />
        </div>

        <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
          Send Request
        </button>
      </div>
    </div>
  );
};

export default RequestForm;
