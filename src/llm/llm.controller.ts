import { Body, Controller, Get, HttpCode, NotFoundException, Post } from '@nestjs/common';
import { ZBody } from 'nest-zod/swagger';
import z from 'zod';
import { PROVIDER_CATALOG } from '~config/llm.config.js';
import { ValidationPipe } from '~pipe/validation.pipe.js';
import { chatSchema, ChatSchemaDto } from '~schema/llm.schema.js';
import { LlmService } from './llm.service.js';

@Controller('v1')
export class LlmController {
    constructor(private llmService: LlmService) {}

    @Get('models')
    async getVirtualModels() {
        return Object.keys(PROVIDER_CATALOG).map((id) => {
            return {
                id,
                label: PROVIDER_CATALOG[id].label
            };
        });
    }

    // @Post('model')
    // async getVirtualModel(
    //     @ZBody(
    //         z.object({
    //             id: z.string()
    //         }),
    //         ValidationPipe
    //     )
    //     body: {
    //         id: string;
    //     }
    // ) {
    //     return this.llmService.resolveProvider(body.id);
    // }

    @Post('chat')
    @HttpCode(200)
    async chat(@ZBody(chatSchema, ValidationPipe) body: ChatSchemaDto) {
        let { provider, messages } = body;
        const providerConfig = this.llmService.resolveProvider(provider);
        console.log('providerConfig', providerConfig);
        if (!providerConfig) {
            throw new NotFoundException('未查询到对应的模型供应商');
        }
        const content = '模拟分析：需求需要验证。';
        messages.unshift({
            role: 'assistant',
            content
        });
        return { messages, finish_reason: 'stop', created: Math.floor(Date.now() / 1000), usage: 32443 };
    }
}
