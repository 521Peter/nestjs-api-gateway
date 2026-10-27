import { z } from 'zod';

export const llmMessageSchema = z.object({
    role: z.enum(['system', 'user', 'assistant', 'tool']),
    content: z.string()
});

export const llmSchema = z.object({
    model: z.string().min(1),
    messages: z.array(llmMessageSchema).min(1),
    stream: z.boolean().optional(),
    temperature: z.number().optional(),
    // eslint-disable-next-line @typescript-eslint/naming-convention
    max_tokens: z.int().positive().optional()
});

export type LlmSchemaDto = z.infer<typeof llmSchema>;
