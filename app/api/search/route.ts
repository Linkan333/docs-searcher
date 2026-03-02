import { db } from "../../lib/db"
import { documents } from "../../lib/schema"
import { eq, ilike } from "drizzle-orm"

export async function GET(req: Request) {

  const { searchParams } = new URL(req.url)

  const query = searchParams.get("q")
  const language = searchParams.get("lang")

  if (!query || !language) {
    return Response.json([])
  }

  const results = await db
    .select()
    .from(documents)
    .where(
      ilike(documents.method, `%${query}%`)
    )

  return Response.json(results)

}