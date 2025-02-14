"use client";

import { useState } from "react";
import RequestForm from "@/components/RequestForm";
import APIResponse from "@/components/Response";
import { ResponseContext } from "@/ResponseContext";
import { ResponseData } from "@/types";
import { defaultResponseData } from "@/constants";

export default function Home() {
  const [resp, setResp] = useState<ResponseData>({ ...defaultResponseData });

  return (
    <ResponseContext.Provider value={{ resp, setResp }}>
      <div className="max-h-screen">
        <header className="bg-blue-600 text-white py-4 text-center">
          <h1 className="text-3xl font-bold">API Sage</h1>
          <p className="text-sm">Your wise companion for mastering APIs</p>
        </header>

        <main className="mx-auto p-9 flex">
          <div className="w-1/2 p-4 overflow-auto bg-gray-900">
            <RequestForm />
          </div>
          <div className="w-1/2 p-4 overflow-auto bg-gray-800">
            <APIResponse />
          </div>
        </main>
      </div>
    </ResponseContext.Provider>
  );
}
