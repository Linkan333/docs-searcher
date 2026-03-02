import { Pool } from "pg"

const pool = new Pool({
  connectionString: process.env.GOONER_URL
})

await pool.query(`

CREATE TABLE IF NOT EXISTS documents (

id TEXT PRIMARY KEY,

method TEXT,
language TEXT,
url TEXT,

signatures TEXT[],
examples TEXT[]

);

`)

console.log("Table created successfully")

process.exit()