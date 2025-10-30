import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  /**
   * Specify your client-side environment variables schema here.
   * This way you can ensure the app isn't built with invalid env vars.
   * To expose them to the client, prefix them with `NEXT_PUBLIC_`.
   */
  client: {
    NEXT_PUBLIC_API_URL: z.string().url(),
    NEXT_PUBLIC_WS_URL: z.string().url(),
    NEXT_PUBLIC_ENABLE_DEVTOOLS: z
      .string()
      .transform((val) => val === 'true')
      .default('false'),
    NEXT_PUBLIC_ENABLE_MSW: z
      .string()
      .transform((val) => val === 'true')
      .default('false'),
    NEXT_PUBLIC_APP_NAME: z.string().default('Tryout System'),
    NEXT_PUBLIC_MAX_FILE_SIZE: z.string().transform(Number).default('5242880'),
    NEXT_PUBLIC_ALLOWED_IMAGE_TYPES: z.string().default('image/jpeg,image/png,image/webp'),
    NEXT_PUBLIC_SESSION_TIMEOUT: z.string().transform(Number).default('1800000'),
    NEXT_PUBLIC_TOKEN_REFRESH_INTERVAL: z.string().transform(Number).default('300000'),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtime.
   * This is because it's only available in the Node.js runtime.
   * For this reason, we need to manually specify the runtime environment variables.
   */
  runtimeEnv: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_WS_URL: process.env.NEXT_PUBLIC_WS_URL,
    NEXT_PUBLIC_ENABLE_DEVTOOLS: process.env.NEXT_PUBLIC_ENABLE_DEVTOOLS,
    NEXT_PUBLIC_ENABLE_MSW: process.env.NEXT_PUBLIC_ENABLE_MSW,
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
    NEXT_PUBLIC_MAX_FILE_SIZE: process.env.NEXT_PUBLIC_MAX_FILE_SIZE,
    NEXT_PUBLIC_ALLOWED_IMAGE_TYPES: process.env.NEXT_PUBLIC_ALLOWED_IMAGE_TYPES,
    NEXT_PUBLIC_SESSION_TIMEOUT: process.env.NEXT_PUBLIC_SESSION_TIMEOUT,
    NEXT_PUBLIC_TOKEN_REFRESH_INTERVAL: process.env.NEXT_PUBLIC_TOKEN_REFRESH_INTERVAL,
  },

  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
   * This is especially useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,

  /**
   * Makes it so that empty strings are treated as undefined.
   * `SOME_VAR: z.string()` and `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,
});
