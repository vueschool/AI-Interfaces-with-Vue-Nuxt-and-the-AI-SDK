import { google } from "@ai-sdk/google";
import { generateText, stepCountIs } from "ai";
import fs from "node:fs";

const result = await generateText({
  model: google("gemini-2.5-flash"),
  tools: {
    google_search: google.tools.googleSearch({}),
  },
  stopWhen: stepCountIs(3),
  prompt: "I live in Tuscaloosa, AL. What should I do this weekend?",
});

fs.writeFileSync("14-result.json", JSON.stringify(result, null, 2));
console.log(result.text);
