import { gql } from "urql";
import { urql } from "~/lib/urql";
import { CharactersResult } from "~/types/response";

const CHARACTERS_QUERY = gql<CharactersResult, { page: number }>`
  query Characters($page: Int) {
    characters(page: $page) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        name
        status
        image
        location {
          name
        }
      }
    }
  }
`

export async function getCharacters(page: number = 1) {
  const result = await urql.query(CHARACTERS_QUERY, { page })

  if (result.error) {
    console.error(result.error)
    throw new Error(`Failed to fetch`)
  }

  return result.data
}

