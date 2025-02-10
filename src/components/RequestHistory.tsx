const RequestHistory = () => {
  return (
    <div className="fixed top-0 right-0 h-full w-64 bg-white shadow-lg p-4">
      <h2 className="text-xl font-semibold mb-4 text-black">Request History</h2>
      <ul className="space-y-2">
        <li className="p-2 text-black bg-gray-100 rounded-md">GET /users</li>
        <li className="p-2 text-black bg-gray-100 rounded-md">POST /users</li>
        <li className="p-2 text-black bg-gray-100 rounded-md">PUT /users/1</li>
      </ul>
    </div>
  );
};

export default RequestHistory;
