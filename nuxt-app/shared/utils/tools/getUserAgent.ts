import { tool } from 'ai'
import { z } from 'zod'
import type { UIToolInvocation } from 'ai'

export type GetUserAgentToolInvocation = UIToolInvocation<typeof getUserAgentTool>

export const getUserAgentTool = tool({
  description: 'Get the user agent of the current browser',
  inputSchema: z.object({})
})
