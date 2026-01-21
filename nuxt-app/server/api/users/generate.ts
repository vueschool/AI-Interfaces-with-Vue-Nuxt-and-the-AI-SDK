// server/api/users/generate.ts
import { streamText, Output } from 'ai'
import { google } from '@ai-sdk/google'

export default defineEventHandler(async () => {
  const result = streamText({
    model: google('gemini-flash-latest'),
    output: Output.array({
      element: userSchema
    }),
    prompt: `Generate 10 users.`
  })

  return result.toTextStreamResponse()
})
