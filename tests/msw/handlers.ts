import { graphql, HttpResponse } from 'msw'
import { Character, CharacterResult, CharactersResult } from '~/types/response'

const api = graphql.link('https://rickandmortyapi.com/graphql')

export const handlers = [
  api.query<CharactersResult, { page: string }>('Characters', ({ variables }) => {
    const { page = 1 } = variables

    const pages: Record<number, Pick<Character, 'id' | 'name' | 'status' | 'image' | 'location'>[]> = {
      1: [
        { id: 1, name: "Rick Sanchez",  status: "Alive", image: "...", location: { name: "Earth", url: "" } },
        { id: 2, name: "Morty Smith",   status: "Alive", image: "...", location: { name: "Earth", url: "" } },
      ],
      2: [
        { id: 3, name: "Summer Smith",  status: "Alive", image: "...", location: { name: "Earth", url: "" } },
        { id: 4, name: "Beth Smith",    status: "Alive", image: "...", location: { name: "Earth", url: "" } },
      ],
    };

    const count = 4;
    const results = pages[Number(page)] ?? []

    return HttpResponse.json({
      data: {
        characters: {
          info: { count, pages: 2, next: page === 1 ? 2 : null, prev: Number(page) < 2 ? null : 1 },
          results,
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
