import { config } from 'dotenv';
import postgres from 'postgres';

config({
  path: '.env.local',
});

const resetDatabase = async () => {
  if (!process.env.POSTGRES_URL) {
    throw new Error('POSTGRES_URL is not defined');
  }

  const connection = postgres(process.env.POSTGRES_URL, { max: 1 });

  console.log('⏳ Dropping all tables...');

  // Drop all tables in the public schema
  await connection.unsafe(`
    DO $$ DECLARE
      r RECORD;
    BEGIN
      FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public') LOOP
        EXECUTE 'DROP TABLE IF EXISTS ' || quote_ident(r.tablename) || ' CASCADE';
      END LOOP;
    END $$;
  `);

  // Drop the drizzle schema and its contents
  await connection.unsafe(`DROP SCHEMA IF EXISTS "drizzle" CASCADE;`);

  console.log('✅ All tables and schemas dropped');
  
  await connection.end();
  process.exit(0);
};

resetDatabase().catch((err) => {
  console.error('❌ Reset failed');
  console.error(err);
  process.exit(1);
}); 