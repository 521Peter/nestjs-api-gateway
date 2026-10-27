import { z } from 'zod';

export const chatMessageSchema = z.object({
    role: z.enum(['system', 'user', 'assistant', 'tool']),
    content: z.string()
});

export const chatSchema = z.object({
    model: z.string().min(1),
    messages: z.array(chatMessageSchema).min(1),
    stream: z.boolean().optional(),
    temperature: z.number().optional(),
    // eslint-disable-next-line @typescript-eslint/naming-convention
    max_tokens: z.int().positive().optional()
});

export type ChatSchemaDto = z.infer<typeof chatSchema>;
