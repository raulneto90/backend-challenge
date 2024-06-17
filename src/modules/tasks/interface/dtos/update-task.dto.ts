import { z } from 'zod';

export const updateTaskParamsDTO = z.object({
  id: z.string(),
});

export const updateTaskBodyDTO = z.object({
  title: z.string(),
  description: z.string(),
  status: z.enum(['pendente', 'em progresso', 'concluído']),
});
