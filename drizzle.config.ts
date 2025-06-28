import { defineConfig } from "drizzle-kit";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL, ensure the database is provisioned");
}

export default defineConfig({
  out: "./migrations",
  schema: "./shared/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.psql 'postgresql://neondb_owner:npg_q1z9sMVxvKyd@ep-purple-bush-a8ywb6z1-pooler.eastus2.azure.neon.tech/neondb?sslmode=require&channel_binding=require',
  },
});
