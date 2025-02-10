import RequestForm from "@/components/RequestForm";
import APIResponse from "@/components/Response";
import AIXplain from "@/components/AIXplain";
import RequestHistory from "@/components/RequestHistory";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white py-4 text-center">
        <h1 className="text-3xl font-bold">API Sage</h1>
        <p className="text-sm">Your wise companion for mastering APIs</p>
      </header>

      <main className="container mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="col-span-2">
            <RequestForm />
          </div>

          {/* <div className="col-span-1">
            <RequestHistory />
          </div> */}

          <div className="col-span-2">
            <APIResponse />
          </div>
        </div>

        <div className="mt-6">
          <AIXplain />
        </div>
      </main>
    </div>
  );
}
