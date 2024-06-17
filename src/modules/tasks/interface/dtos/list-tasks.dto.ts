import { z } from 'zod';

export const listTasksQueryDTO = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(50).default(10),
});
