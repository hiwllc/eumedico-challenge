import { cacheExchange, createClient, fetchExchange } from "urql";

export const urql = createClient({
  url: 'https://rickandmortyapi.com/graphql',
  exchanges: [cacheExchange, fetchExchange],
  requestPolicy: 'cache-first'
})
