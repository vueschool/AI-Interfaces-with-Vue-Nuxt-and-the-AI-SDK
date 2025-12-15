import { generateText, Output } from "ai";
import { google } from "@ai-sdk/google";
import { z } from "zod";

const result = await generateText({
  model: google("gemini-2.5-flash"),
  output: Output.object({
    schema: z.object({
      name: z.string(),
      superpowers: z.array(z.string()),
      weaknesses: z.array(z.string()),
      backstory: z.string(),
      isHero: z.boolean(),
      isVillain: z.boolean(),
    }),
  }),
  prompt: "Who is the most powerful comic book character?",
});

// console.log(result.text);
console.log(result.output);
console.log(result.output.name);
