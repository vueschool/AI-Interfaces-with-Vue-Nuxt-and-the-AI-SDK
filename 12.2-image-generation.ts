import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import fs from "node:fs";

const result = await generateText({
  model: google("gemini-2.5-flash-image-preview"),
  prompt: "Generate an image of a superhero cat",
});

for (const file of result.files) {
  if (file.mediaType.startsWith("image/")) {
    const randomId = crypto.randomUUID();
    if (!fs.existsSync("images/gemini")) {
      fs.mkdirSync("images/gemini", { recursive: true });
    }
    const filename = `images/gemini/${randomId}.png`;
    fs.writeFileSync(`images/gemini/${randomId}.png`, file.uint8Array);
    console.log("Generated image:", filename);
  }
}
