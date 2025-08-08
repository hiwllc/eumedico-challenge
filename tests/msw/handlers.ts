import { graphql, HttpResponse } from 'msw'
import { CharactersResult } from '~/types/response'

const api = graphql.link('https://rickandmortyapi.com/graphql')

export const handlers = [
  api.query<CharactersResult, { page: string }>('Characters', ({ variables }) => {
    return HttpResponse.json({
      data: {
        characters: {
          info: { count: 2, pages: 1, next: null, prev: null },
          results: [
            { id: 1, name: 'Rick Sanchez', status: 'Alive', image: '...', location: { name: 'Earth', url: '' } },
            { id: 2, name: 'Morty Smith', status: 'Alive', image: '...', location: { name: 'Earth', url: '' } },
          ],
        },
      }
    })
  })
]
