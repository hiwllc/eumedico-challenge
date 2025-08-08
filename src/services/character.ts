import { gql } from "urql"
import { urql } from "~/lib/urql"
import { CharacterResult } from "~/types/response"

const CHARACTER_QUERY = gql<CharacterResult, { id: string }>`
  query Character($id: ID!) {
    character(id: $id) {
      id
      name
      status
      image
      gender
      species
      origin {
        name
      }
      location {
        name
      }
    }
  }
`

export async function getCharacter(id: string) {
  const result = await urql.query(CHARACTER_QUERY, { id })

  if (result.error) {
    console.error(result.error)
    throw new Error(`Failed to fetch`)
  }

  return result.data
}
