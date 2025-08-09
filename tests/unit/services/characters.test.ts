import { expect, test } from "vitest";
import { getCharacters } from "~/services/characters";

test('Should return a list of characters', async () => {
  const data = await getCharacters();

  expect(data?.characters.info.next).toEqual(2);
  expect(data?.characters.info.prev).toBeNull();

  expect(data?.characters.results).toHaveLength(2)
  expect(data?.characters.results.map(({ name }) => name)).toEqual(
    expect.arrayContaining(['Rick Sanchez', 'Morty Smith'])
  )
})

test('Should return a list of characters from second page', async () => {
  const data = await getCharacters(2);

  expect(data?.characters.info.next).toBeNull()
  expect(data?.characters.info.prev).toEqual(1);

  expect(data?.characters.results).toHaveLength(2)
  expect(data?.characters.results.map(({ name }) => name)).toEqual(
    expect.arrayContaining(['Summer Smith', 'Beth Smith'])
  )
})
