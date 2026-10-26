import { Controller, Get } from '@nestjs/common';

@Controller('v1')
export class LlmController {
    constructor() {}

    @Get('models')
    async getVirtualModels() {
        return { object: 'list', data: [{ id: 'market-analysis', object: 'model', created: 0, ownedBy: 'local' }] };
    }
}
