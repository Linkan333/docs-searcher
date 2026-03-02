import * as cheerio from "cheerio"
import { db } from "./db.ts"
import { documents } from "./schema.ts"
import { randomUUID } from "crypto"

export async function scrape(URL: string) {

  const res = await fetch(URL)
  const html = await res.text()

  const $ = cheerio.load(html)

  const examples: string[] = []
  const signatures: string[] = []

  const method =
    $("h1").first().text().replace("()", "").trim()

  $("pre code").each((_i, el) => {

    const text = $(el).text().trim()

    if (text.includes("(") && text.length < 80) {
      signatures.push(text)
    }

  })

  $(".code-example").each((_i, el) => {

    const text =
      $(el).find("code").text().trim()

    examples.push(text)

  })

  console.log(method)
  

  await db.insert(documents).values({

    id: randomUUID(),
    method,
    language: "javascript",
    url: URL,
    signatures,
    examples

  })

}



export default scrape;