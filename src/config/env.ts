// src/config/env.ts
import { z } from 'zod';

const envSchema = z.object({
    NEXT_PUBLIC_API_URL: z.string().url('API URL must be a valid URL'),
    NEXT_PUBLIC_WS_URL: z.string().url('WebSocket URL must be a valid URL').optional(),
    NEXT_PUBLIC_APP_ENV: z
        .enum(['development', 'staging', 'production'])
        .optional()
        .default('development'),
    NEXT_PUBLIC_ENABLE_DEVTOOLS: z
        .string()
        .optional()
        .default('true')
        .transform((val) => val === 'true'),
});

const parseEnv = () => {
    const parsed = envSchema.safeParse({
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
        NEXT_PUBLIC_WS_URL: process.env.NEXT_PUBLIC_WS_URL,
        NEXT_PUBLIC_APP_ENV: process.env.NEXT_PUBLIC_APP_ENV,
        NEXT_PUBLIC_ENABLE_DEVTOOLS: process.env.NEXT_PUBLIC_ENABLE_DEVTOOLS,
    });

    if (!parsed.success) {
        console.error('❌ Invalid environment variables:', parsed.error.flatten().fieldErrors);
        throw new Error('Invalid environment variables');
    }

    return parsed.data;
};

export const env = parseEnv();