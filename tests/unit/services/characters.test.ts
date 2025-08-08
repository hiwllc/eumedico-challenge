import { expect, test } from "vitest";
import { getCharacters } from "~/services/characters";

test('Should return a list of characters', async () => {
  const data = await getCharacters();

  expect(data?.characters.results).toHaveLength(2)
  expect(data?.characters.results.map(({ name }) => name)).toEqual(
    expect.arrayContaining(['Rick Sanchez', 'Morty Smith'])
  )
})
