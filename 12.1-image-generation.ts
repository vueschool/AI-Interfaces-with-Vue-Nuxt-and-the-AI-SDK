import { experimental_generateImage as generateImage } from "ai";
import { google } from "@ai-sdk/google";
import fs from "node:fs";
import crypto from "node:crypto";

const result = await generateImage({
  model: google.image("imagen-4.0-fast-generate-001"),

  // Image Size:
  // aspect ratio and size differ between models
  aspectRatio: "16:9", // 1:1, 3:4, 4:3, 9:16, 16:9
  // size: "1024x1024", //NOT supported by google imagen

  // What to generate:
  prompt: "Generate an image of a superhero cat",

  // How many images:
  n: 4,
});

for (const image of result.images) {
  const randomId = crypto.randomUUID();
  if (!fs.existsSync("images/imagen")) {
    fs.mkdirSync("images/imagen", { recursive: true });
  }
  const filename = `images/imagen/${randomId}.png`;
  fs.writeFileSync(filename, image.uint8Array);
  console.log("Generated image:", filename);
}
