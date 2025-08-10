import { graphql, HttpResponse } from 'msw'
import { QueryParams } from '~/services/characters'
import { CharacterResult, CharactersResult } from '~/types/response'

const api = graphql.link('https://rickandmortyapi.com/graphql')

export const handlers = [
  api.query<CharactersResult, QueryParams>('Characters', ({ variables }) => {
    const PAGE_SIZE = 2
    const { page = 1, name, status, gender } = variables

    const characters = [
      { id: 1, name: "Rick Sanchez", gender: 'Male',  status: "Alive", image: "...", location: { name: "Earth", url: "" } },
      { id: 2, name: "Morty Smith", gender: 'Male',  status: "Alive", image: "...", location: { name: "Earth", url: "" } },
      { id: 3, name: "Summer Smith", gender: 'Female', status: "Dead", image: "...", location: { name: "Earth", url: "" } },
      { id: 4, name: "Beth Smith",  gender: 'Female',  status: "Unknown", image: "...", location: { name: "Earth", url: "" } },
    ]

    let data = characters

    if (name) {
      data = data.filter(character => character.name.toLocaleLowerCase().includes(name.toLocaleLowerCase()))
    }

    if (status) {
      data = data.filter(character => character.status === status)
    }

    if (gender) {
      data = data.filter(character => character.gender === gender)
    }

    const count = data.length;
    const pages = Math.max(1, Math.ceil(count / PAGE_SIZE))
    const start = (page - 1) * PAGE_SIZE
    const results = data.slice(start, start + PAGE_SIZE)

    return HttpResponse.json({
      data: {
        characters: {
          info: {
            count,
            pages,
            next: page < pages ? page + 1 : null,
            prev: page > 1 ? page - 1 : null
          },
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
