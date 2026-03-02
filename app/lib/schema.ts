import { pgTable, text } from "drizzle-orm/pg-core"

export const documents = pgTable("documents", {
  id: text("id").primaryKey(),

  method: text("method"),
  language: text("language"),
  url: text("url"),

  signatures: text("signatures").array(),
  examples: text("examples").array()
})