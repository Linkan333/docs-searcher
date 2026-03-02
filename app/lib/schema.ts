import { pgTable, text, uuid } from "drizzle-orm/pg-core";

export const documents = pgTable("documents", {
  id: uuid("id").primaryKey(),
  method: text("method"),
  url: text("url"),
  language: text("language"),
  signatures: text("signatures").array(),
  examples: text("examples").array(),
});