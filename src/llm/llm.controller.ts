import { Controller, Get, HttpCode, Post } from '@nestjs/common';
import { ZBody } from 'nest-zod/swagger';
import { ValidationPipe } from '~pipe/validation.pipe.js';
import { llmSchema, LlmSchemaDto } from '~schema/llm.schema.js';

@Controller('v1')
export class LlmController {
    constructor() {}

    @Get('models')
    async getVirtualModels() {
        return { object: 'list', data: [{ id: 'market-analysis', object: 'model', created: 0, ownedBy: 'local' }] };
    }

    @Post('chat')
    @HttpCode(200)
    async chat(@ZBody(llmSchema, ValidationPipe) body: LlmSchemaDto) {
        return { receivedModel: body.model };
    }
}
