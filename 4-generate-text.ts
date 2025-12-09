import { generateText } from "ai";
import { google } from "@ai-sdk/google";

const result = await generateText({
  model: google("gemini-2.5-flash"),
  prompt: "Who is the most powerful super hero and why? Be concise.",
});

console.log(result.text);
