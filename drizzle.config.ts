import type { Config } from 'drizzle-kit';
import { defineConfig } from 'drizzle-kit';
import * as dotenv from 'dotenv';

dotenv.config({
  path: '.env',
});

const POSTGRES_URL = process.env.POSTGRES_URL || 'postgres://postgres:postgres@localhost:5432/ai_chatbot';

console.log('Using PostgreSQL URL:', POSTGRES_URL);

export default defineConfig({
  schema: './lib/db/schema.ts',
  out: './lib/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: POSTGRES_URL,
  },
});
