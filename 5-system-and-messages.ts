import { generateText } from "ai";
import { google } from "@ai-sdk/google";

const result = await generateText({
  model: google("gemini-2.5-flash"),
  system: "Address the user by name.",
  messages: [
    { role: "user", content: "Hi, my name is Daniel" },
    { role: "assistant", content: "Hello Daniel, how can I help you?" },
    { role: "user", content: "Who is the most powerful superhero and why?" },
  ],
});

console.log(result.text);
