import { env } from './env.config.js';

export interface ProviderConfig {
    /** 前端展示名称 */
    label: string;
    /** OpenAI 兼容接口的 base URL */
    baseURL: string;
    apiKey: string;
}

export const PROVIDER_CATALOG: Readonly<Record<string, ProviderConfig>> = {
    openai: {
        label: 'OpenAI',
        baseURL: 'https://api.openai.com/v1',
        apiKey: env.LLM.KEY.OPENAI_API_KEY
    },
    glm: {
        label: '智谱 GLM',
        baseURL: 'https://open.bigmodel.cn/api/coding/paas/v4',
        apiKey: env.LLM.KEY.GLM_API_KEY
    },
    'command code': {
        label: 'Command Code',
        baseURL: 'https://api.commandcode.ai/provider/v1',
        apiKey: env.LLM.KEY.COMMAND_CODE_API_KEY
    },
    deepseek: {
        label: 'DeepSeek',
        baseURL: 'https://api.deepseek.com',
        apiKey: env.LLM.KEY.DEEPSEEK_API_KEY
    }
};
