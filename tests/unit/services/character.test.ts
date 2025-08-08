import { expect, test } from "vitest";
import { getCharacter } from "~/services/character";

test('Should return one character', async () => {
  const data = await getCharacter('1');

  expect(data?.character).toMatchObject({
    id: 1,
    name: 'Rick Sanchez'
  })
})
