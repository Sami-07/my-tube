import { pgTable, varchar, timestamp } from "drizzle-orm/pg-core";

export const User = pgTable("user", {
    id: varchar("id").primaryKey(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    name: varchar("name", { length: 256 }).notNull(),
    email: varchar("email", { length: 256 }).notNull().unique(),
});
