import { useContext, useState } from "react";
import ReactMarkdown from "react-markdown";
import { ResponseContext } from "@/ResponseContext";
import { AIExplainProps } from "@/types";
import { REQUEST } from "@/constants";
import Modal from "./Modal";

const AIXplain: React.FC<AIExplainProps> = ({
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
        className="inline-flex font-extrabold invert items-center space-x-2 text-blue-600 hover:text-blue-400 disabled:text-gray-500"
      >
        <img src="/color-wand.svg" alt="AI-Wand" className="w-5 h-5" />
        <span>Get AI Explanation for your {type}</span>
      </button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setExplanation("");
        }}
        title={`API ${type} Explanation`}
      >
        <div className="space-y-4">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
            </div>
          ) : (
            <div className="prose prose-invert max-w-none">
              <pre className="whitespace-pre-wrap text-sm bg-gray-900 p-4 rounded-lg">
                <ReactMarkdown>{explanation}</ReactMarkdown>
              </pre>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};

export default AIXplain;
