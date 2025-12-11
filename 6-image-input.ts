import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import fs from "node:fs";
const image = fs.readFileSync("./p07ryyyj.jpg.webp");

const result = await generateText({
  model: google("gemini-2.5-flash"),
  messages: [
    {
      role: "user",
      content: [
        {
          type: "image",
          image: image.toString("base64"),
          //   image: "https://ichef.bbci.co.uk/images/ic/1024xn/p07ryyyj.jpg.webp",
        },
        {
          type: "text",
          text: "Describe this image. Be concise",
        },
      ],
    },
  ],
});

console.log(result.text);
