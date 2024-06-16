import { z } from 'zod';

export const createUserTokenSchema = z.object({
  username: z.string(),
  password: z.string(),
});
