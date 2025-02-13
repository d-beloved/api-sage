import { useContext, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { ResponseContext } from "@/ResponseContext";
import { AIExplainProps } from "@/types";
import { REQUEST } from "@/constants";

const AIXplain: React.FC<AIExplainProps> = ({
  text,
  type,
  disabled,
  url,
  method,
  headers,
  body,
}) => {
  const responseContext = useContext(ResponseContext);
  const response = responseContext?.resp;
  const [explanation, setExplanation] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (type === REQUEST) {
      setExplanation("");
    }
  }, [method]);

  const getExplanation = async () => {
    setIsLoading(true);
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
    <div className="bg-gray-800 rounded-lg p-6 mt-6">
      <button
        onClick={getExplanation}
        disabled={isLoading || disabled}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-blue-400"
      >
        {isLoading ? "Analyzing..." : text}
      </button>
      {explanation && (
        <div className="prose prose-invert max-w-none">
          <ReactMarkdown>{explanation}</ReactMarkdown>
        </div>
      )}
    </div>
  );
};

export default AIXplain;
