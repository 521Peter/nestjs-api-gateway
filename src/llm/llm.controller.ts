import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';

@Controller('v1')
export class LlmController {
    constructor() {}

    @Get('models')
    async getVirtualModels() {
        return { object: 'list', data: [{ id: 'market-analysis', object: 'model', created: 0, ownedBy: 'local' }] };
    }

    @Post('chat')
    @HttpCode(200)
    async chat(@Body('model') model: string) {
        return { receivedModel: model };
    }
}
