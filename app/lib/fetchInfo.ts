import OpenAI from "openai";
import { db } from "./db";
import { documents } from "./schema";
import { randomUUID } from "crypto";
const client = new OpenAI();


/* Import the e.target.value from search
then make a nice little loading effect that will make the user
be able to wait, then it should also store every docs in the databse
for faster fetching when its been searched one time */


export async function getInformation(query: string, language: string) {
  const response = await client.responses.create({
    model: "gpt-4.1-mini",
    input: `
Return ONLY valid JSON:
{
  "method": "",
  "language": "",
  "url": "",
  "signatures": [],
  "examples": []
}

Explain ${query} in ${language}.
`
  });

  let parsed;

  try {
    parsed = JSON.parse(response.output_text);
  } catch {
    throw new Error("Invalid JSON returned from model");
  }

  const id = randomUUID();

  await db.insert(documents).values({
    id,
    method: parsed?.method ?? null,
    url: parsed?.url ?? null,
    language: parsed?.language ?? null,
    signatures: parsed?.signatures ?? [],
    examples: parsed?.examples ?? []
  });

  return parsed;
}