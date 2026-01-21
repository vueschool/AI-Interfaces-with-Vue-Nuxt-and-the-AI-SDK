// shared/utils/userSchema
import { z } from 'zod'

export const userSchema = z.object({
  name: z.string().describe('The user\'s first and last name.'),
  email: z.string(),
  avatar: z.string().describe('URL of placeholder image from pravatar.cc'),
  username: z.string().describe('The user\'s username. It should be unique and contain only lowercase letters, numbers, and underscores.')
})
