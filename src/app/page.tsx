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
      <div className="min-h-screen flex flex-col bg-gray-900">
        <header className="bg-violet-700 text-white py-3 sm:py-4 px-4 text-center sticky top-0 z-10">
          <h1 className="text-2xl sm:text-3xl font-bold">API Sage</h1>
          <div className="space-y-0.5">
            <p className="text-sm sm:text-base font-bold text-violet-100">
              Explore HTTP Methods with Intelligence
            </p>
            <p className="text-xs sm:text-sm font-medium text-violet-200/80">
              Master API requests with AI-powered insights
            </p>
          </div>
        </header>

        <main className="flex-1 flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/2 p-3 sm:p-4 md:p-6 min-h-[50vh] lg:min-h-[80vh] overflow-auto scrollbar-thin scrollbar-thumb-violet-600 bg-gray-900">
            <RequestForm />
          </div>
          <div className="w-full lg:w-1/2 p-3 sm:p-4 md:p-6 min-h-[50vh] lg:min-h-[80vh] overflow-auto scrollbar-thin scrollbar-thumb-violet-600 bg-gray-800">
            <APIResponse />
          </div>
        </main>
      </div>
    </ResponseContext.Provider>
  );
}
