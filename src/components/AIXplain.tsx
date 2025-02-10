const AIXplain = () => {
  return (
    <div className="mt-6 p-6 bg-gray-500 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">AI Explanations</h2>
      <div className="space-y-4">
        <div>
          <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
            Explain Method
          </button>
          <div className="mt-2 p-3 text-black bg-white border border-gray-300 rounded-md">
            <p>
              The GET method is used to retrieve data from a server. It should
              not have any side effects on the server.
            </p>
          </div>
        </div>

        <div>
          <button className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700">
            Explain Response
          </button>
          <div className="mt-2 p-3 text-black bg-white border border-gray-300 rounded-md">
            <p>
              A 200 status code indicates that the request was successful. The
              response body contains the requested data.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIXplain;
