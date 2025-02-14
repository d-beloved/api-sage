import { HfInference } from "@huggingface/inference";
import { AIExplanation } from "@/types";

const hf = new HfInference(process.env.HUGGING_FACE_API_KEY);

export async function generateExplanation(
  data: AIExplanation
): Promise<string> {
  let promptType = "";

  if (data.request) {
    promptType = `
    REQUEST:
		URL: ${data.request.url}
    Method: ${data.request.method}
    Headers: ${JSON.stringify(data.request.headers, null, 2)}
    ${data.request.body ? `Body: ${JSON.stringify(data.request.body, null, 2)}` : "No body"}`;
  }

  if (data.response) {
    promptType = `
    RESPONSE:
    Status: ${data.response.status}
    Headers: ${JSON.stringify(data.response.headers, null, 2)}
    Body: ${JSON.stringify(data.response.body, null, 2)}`;
  }

  const prompt = `
    Analyze this API ${data.request ? "request" : "response"} (maximum 400 words):

    ${promptType}

    Provide a structured analysis in this format:

    ${
      data.request
        ? `
    REQUEST ANALYSIS:
    1. URL Purpose: [one line explanation]
    2. Method Purpose: [one line explanation]
    3. Headers Analysis:
       - [header name]: [brief purpose]
    4. Body Analysis: [if present, brief structure explanation]
    `
        : `
    RESPONSE ANALYSIS:
    1. Status Code: [code meaning in one line]
    2. Headers Analysis:
       - [header name]: [brief purpose]
    3. Body Structure: [brief explanation]
    `
    }

    SECURITY CONSIDERATIONS:
    - [list 2-3 key security points]

    BEST PRACTICES:
    1. [first practice]
    2. [second practice]
    3. [third practice]

    Keep each point concise and focused. Use bullet points and numbered lists only as shown above.
    Avoid general statements and focus on specific details from the provided ${data.request ? "request" : "response"}.
  `;

  try {
    const response = await hf.textGeneration({
      model: "google/gemma-2-2b-it",
      inputs: prompt,
      parameters: {
        max_new_tokens: 800,
        temperature: 0.7,
        top_p: 0.95,
        repetition_penalty: 1.2,
        return_full_text: false,
      },
    });

    const generatedText = response.generated_text || "";

    const wordCount = generatedText.trim().split(/\s+/).length;

    if (wordCount > 400) {
      const words = generatedText.trim().split(/\s+/).slice(0, 400);
      return words.join(" ") + "...";
    }

    return generatedText || "Could not generate explanation at this time.";
  } catch (error) {
    console.error("Hugging Face API Error:", error);
    return "Failed to generate explanation. Please try again later.";
  }
}
