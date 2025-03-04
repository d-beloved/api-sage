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
        <header className="bg-violet-700/50 text-white py-3 px-4 text-center top-0 z-10 rounded-b-full">
          <h1 className="text-2xl max-[320px]:text-xl sm:text-3xl font-bold">
            API Sage
          </h1>
          <div className="space-y-0.5">
            <p className="text-sm max-[320px]:text-xs sm:text-base font-bold text-violet-100">
              Explore HTTP Methods with Intelligence
            </p>
            <p className="text-xs max-[320px]:hidden sm:text-sm font-medium text-violet-200/80">
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

        <footer className="flex gap-2 md:gap-4 flex-col md:flex-row justify-center items-center bg-violet-700/50 text-white py-1 sm:py-3 px-4 text-center bottom-0 z-10 rounded-t-full">
          <p className="text-sm max-[320px]:text-xs sm:text-base font-medium">
            &copy; 2025 API Sage - All rights reserved
          </p>
          <div className="text-sm max-[320px]:text-xs sm:text-base font-medium">
            <a
              href="https://github.com/d-beloved/api-sage"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center hover:text-violet-200/80"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4 inline-block mr-1"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.34-3.369-1.34-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.607.069-.607 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.646 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.91-1.294 2.75-1.025 2.75-1.025.544 1.376.201 2.393.099 2.646.64.699 1.028 1.592 1.028 2.683 0 3.842-2.337 4.687-4.565 4.936.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.579.688.481C19.137 20.165 22 16.418 22 12c0-5.523-4.477-10-10-10z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Star on GitHub</span>
            </a>
          </div>
        </footer>
      </div>
    </ResponseContext.Provider>
  );
}
