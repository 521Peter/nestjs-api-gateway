import { Injectable } from '@nestjs/common';
import { PROVIDER_CATALOG } from '~config/llm.config.js';

@Injectable()
export class LlmService {
    resolveProvider(id: string) {
        return PROVIDER_CATALOG[id];
    }
}
