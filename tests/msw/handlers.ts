import { graphql, HttpResponse } from 'msw'
import { CharacterResult, CharactersResult } from '~/types/response'

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
  }),

  api.query<CharacterResult, { id: string }>('Character', ({ variables }) => {
    return HttpResponse.json({
      data: {
        character: {
          id: 1,
          name: 'Rick Sanchez',
          species: 'Human',
          gender: 'Male',
          status: 'Alive',
          image: '...',
          type: '',
          origin: {
            name: 'Earth (C-137)',
            url: '',
          },
          location: {
            name: 'Earth',
            url: ''
          },
          episode: [''],
          url: '',
          created: ''
        },
      }
    })
  })
]
