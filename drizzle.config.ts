import { defineConfig } from "drizzle-kit";

console.log("database url", process.env.DATABASE_URL);
export default defineConfig({
    schema: "./src/drizzle/schema.ts",
    out: "./src/drizzle/migrations",
    dialect: "postgresql",
    dbCredentials: {    
        url: process.env.DATABASE_URL!,
        
    },
    verbose: true,
    strict: true,
});
