import { Module } from '@nestjs/common';
import { LlmController } from './llm.controller.js';

@Module({
    controllers: [LlmController],
    providers: []
})
export class LlmModule {}
