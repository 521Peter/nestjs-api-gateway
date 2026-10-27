import { BadRequestException } from '@nestjs/common';
import type { ZValidationDecoratorOptions } from 'nest-zod';
import type { z } from 'zod';

/**
 * 把 zod 的 issue 列表拼成一条可直接展示给用户的信息。
 *
 * schema 里只描述问题本身，这里负责补上出错的字段路径（含数组下标）并去重，
 * 例如 “参数校验失败：product 不能为空；dagSpec.nodes.0.id 不能为空”。
 */
export function toValidationMessage(error: z.ZodError): string {
    const messages = error.issues.map((issue) => {
        // strictObject 拦截多余参数时 zod 给的是英文的 Unrecognized key，这里统一转成中文
        const message =
            issue.code === 'unrecognized_keys' ? `不支持额外参数：${issue.keys.join('、')}` : issue.message;
        const path = issue.path.join('.');

        return path ? `${path} ${message}` : message;
    });

    return `参数校验失败：${[...new Set(messages)].join('；')}`;
}

/**
 * 所有 ZBody / ZQuery 共用的校验选项。
 *
 * nest-zod 默认抛出英文的 “Validation failed”，而前端会把 message 直接展示给用户，
 * 因此这里统一替换成 zod issue 拼出的中文信息。
 */
export const ValidationPipe: ZValidationDecoratorOptions = {
    validation: {
        exceptionFactory: (error) => new BadRequestException(toValidationMessage(error))
    }
};
