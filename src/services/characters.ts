import { gql } from "urql";
import { urql } from "~/lib/urql";
import { CharactersResult, Gender, Status } from "~/types/response";

export type QueryParams = {
  page?: number;
  name?: string;
  status?: Status;
  gender?: Gender;
}

const CHARACTERS_QUERY = gql<CharactersResult, QueryParams>`
  query Characters($page: Int, $name: String, $status: String, $gender: String) {
    characters(page: $page, filter: { name: $name, status: $status, gender: $gender }) {
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

export async function getCharacters({ page, name, status, gender }: QueryParams = { page: 1 }) {
  const result = await urql.query(CHARACTERS_QUERY, { page, name, status, gender })

  if (result.error) {
    console.error(result.error)
    throw new Error(`Failed to fetch`)
  }

  return result.data
}

