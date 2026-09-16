import { z } from 'zod';
import 'dotenv/config';

const envSchema = z.object({
  PORT: z.coerce.number().default(4000),
  DATABASE_URL: z.url(),
  NODE_ENV: z.enum(['production', 'development', 'test']).default('development'),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error('Ivalid environments variables:', _env.error?.format());
  process.exit(1);
}

export const env = _env.data;
