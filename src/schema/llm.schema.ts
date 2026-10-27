import { z } from 'zod';

export const chatMessageSchema = z.strictObject({
    role: z.enum(['system', 'user', 'assistant', 'tool']),
    content: z.string()
});

// 如果有多余的参数，不会自动丢弃
export const chatSchema = z.strictObject({
    provider: z.string().min(1),
    messages: z.array(chatMessageSchema).min(1),
    // stream: z.boolean().optional(),
    temperature: z.number().optional(),
    max_tokens: z.int().positive().optional()
});

export type ChatSchemaDto = z.infer<typeof chatSchema>;
