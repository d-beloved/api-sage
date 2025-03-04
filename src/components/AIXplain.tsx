import { FC, useContext, useState } from "react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { ResponseContext } from "@/ResponseContext";
import { AIExplainProps } from "@/types";
import { REQUEST } from "@/constants";
import Modal from "./Modal";

const AIXplain: FC<AIExplainProps> = ({
  type,
  disabled,
  url,
  method,
  headers,
  body,
}) => {
  const responseContext = useContext(ResponseContext);
  const response = responseContext?.resp;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [explanation, setExplanation] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const getExplanation = async () => {
    setIsLoading(true);
    setIsModalOpen(true);
    try {
      const reqBody =
        type === REQUEST
          ? {
              request: {
                url,
                method,
                headers: JSON.parse(headers || "{}"),
                body: body ? JSON.parse(body) : undefined,
              },
            }
          : {
              response: {
                status: response?.status,
                headers: response?.headers,
                body: response?.body,
              },
            };

      const res = await fetch("/api/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reqBody),
      });

      const data = await res.json();
      if (data.explanation) {
        setExplanation(data.explanation);
      }
    } catch (error) {
      console.error("Explanation error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={getExplanation}
        disabled={isLoading || disabled}
        className="group inline-flex items-center space-x-1 sm:space-x-2 text-violet-600 hover:text-violet-400 
          disabled:text-gray-500 text-xs sm:text-sm md:text-base font-semibold transition-colors invert"
        title={`Get AI Explanation for your ${type}`}
      >
        <Image
          src="/color-wand.svg"
          alt="AI-Wand"
          width={0}
          height={0}
          className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform"
        />
        <span className="hidden sm:inline">
          Get AI Explanation for your {type}
        </span>
        <span className="sm:hidden">AI Explain</span>
      </button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setExplanation("");
        }}
        title={`API ${type} Explanation`}
      >
        <div className="space-y-3 sm:space-y-4">
          {isLoading ? (
            <div className="flex items-center justify-center py-6 sm:py-8">
              <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-violet-500" />
            </div>
          ) : (
            <div className="prose prose-invert prose-sm sm:prose max-w-none">
              <div className="max-h-[50vh] sm:max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
                <pre className="whitespace-pre-wrap text-xs sm:text-sm bg-gray-900 p-3 sm:p-4 rounded-lg">
                  <ReactMarkdown
                    components={{
                      // Customize markdown components for better mobile display
                      p: ({ children }) => (
                        <p className="my-2 sm:my-3">{children}</p>
                      ),
                      ul: ({ children }) => (
                        <ul className="my-2 sm:my-3 pl-4 sm:pl-6">
                          {children}
                        </ul>
                      ),
                      li: ({ children }) => (
                        <li className="my-1 sm:my-2">{children}</li>
                      ),
                      pre: ({ children }) => (
                        <pre className="whitespace-pre-wrap">{children}</pre>
                      ),
                    }}
                  >
                    {explanation}
                  </ReactMarkdown>
                </pre>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};

export default AIXplain;
