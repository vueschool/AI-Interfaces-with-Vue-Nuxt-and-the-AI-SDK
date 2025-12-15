import { generateText, Output } from "ai";
import { google } from "@ai-sdk/google";
import { z } from "zod";

const result = await generateText({
  model: google("gemini-2.5-flash"),
  output: Output.object({
    schema: z.object({
      name: z.string(),
      superpowers: z
        .array(z.string())
        .max(3)
        .describe("The character's superpowers. Maximum 3."),
      weaknesses: z.array(z.string()),
      backstory: z
        .string()
        .describe(
          "A short paragraph about how the character got their powers and what they are known for."
        ),
      alignment: z.enum(["good", "evil", "neutral"]),
    }),
  }),
  prompt: "Who is the most powerful comic book character?",
});

console.log(result.output);
