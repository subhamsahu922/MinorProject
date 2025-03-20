import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv';

dotenv.config({
  path: '.env.local',
});

const POSTGRES_URL = process.env.POSTGRES_URL;

console.log('Using PostgreSQL URL:', POSTGRES_URL);

export default {
  schema: './lib/db/schema.ts',
  out: './lib/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: POSTGRES_URL!,
  },
} satisfies Config;
