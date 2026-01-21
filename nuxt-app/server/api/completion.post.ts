import { streamText } from 'ai'
import { z } from 'zod'
import { google } from '@ai-sdk/google'

export default defineEventHandler(async (event) => {
  const { prompt } = await readValidatedBody(event, z.object({
    prompt: z.string()
  }).parse)

  const result = streamText({
    model: google('gemini-flash-latest'),
    prompt
  })

  return result.toUIMessageStreamResponse()
})
