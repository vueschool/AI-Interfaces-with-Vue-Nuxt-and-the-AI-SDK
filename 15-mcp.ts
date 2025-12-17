import { experimental_createMCPClient as createMCPClient } from "@ai-sdk/mcp";
import { generateText, type ToolSet, stepCountIs } from "ai";
import { google } from "@ai-sdk/google";
import fs from "node:fs";

const mcpClient = await createMCPClient({
  transport: {
    type: "http",
    url: "https://ui.nuxt.com/mcp",

    //optional: configure HTTP headers
    //  headers: { Authorization: 'Bearer my-api-key' },
    //optional: provide an OAuth client provider for automatic authorization
    //  authProvider: myOAuthClientProvider,
  },
});

const tools = (await mcpClient.tools()) as ToolSet;

const result = await generateText({
  model: google("gemini-2.5-flash"),
  prompt: "List 10 Nuxt UI components with markdown formatting.",
  tools,
  stopWhen: stepCountIs(2),
  onFinish: async () => {
    await mcpClient.close();
  },
});
fs.writeFileSync("15-result.json", JSON.stringify(result, null, 2));
console.log(result.text);
