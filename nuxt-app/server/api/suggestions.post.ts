import { streamText, Output } from 'ai'
import { z } from 'zod'
// import { openai } from '@ai-sdk/openai'
import { google } from '@ai-sdk/google'

export default defineEventHandler(async (event) => {
  const { prompt } = await readValidatedBody(event, z.object({
    prompt: z.string()
  }).parse)

  if (!prompt || prompt.length < 2) {
    return []
  }

  const result = streamText({
    model: google('gemini-flash-lite-latest'),
    output: Output.array({ element: z.string() }),
    prompt: `You are a helpful AI assistant providing autocomplete suggestions for a chat interface.
The user is typing: "${prompt}"

Provide 3-5 short, relevant completions or questions that the user might be intending to ask.
They should be natural continuations or complete queries starting with the input text.
ALWAYS return the full suggestion, not just the "rest" of the input.
For example, if the user types "what is", you might suggest "what is the capital of France?" or "what is quantum computing?".
If the user types "react", you might suggest "react hooks tutorial" or "react vs vue"

Keep suggestions concise.`
  })

  return result.toTextStreamResponse()
})
