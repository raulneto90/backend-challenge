import { z } from 'zod';

export const findTaskByIdSchema = z.object({
  id: z.string(),
});
