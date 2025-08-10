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
  const data = await getCharacters({ page: 2 });

  expect(data?.characters.info.next).toBeNull()
  expect(data?.characters.info.prev).toEqual(1);

  expect(data?.characters.results).toHaveLength(2)
  expect(data?.characters.results.map(({ name }) => name)).toEqual(
    expect.arrayContaining(['Summer Smith', 'Beth Smith'])
  )
})

test('Should return one result by searching by Rick', async () => {
  const data = await getCharacters({ name: 'rick' });

  expect(data?.characters.info.next).toBeNull()
  expect(data?.characters.info.prev).toBeNull();
  expect(data?.characters.info.count).toBe(1);

  expect(data?.characters.results.map(({ name }) => name)).toEqual(
    expect.arrayContaining(['Rick Sanchez'])
  )
})

test('Should return three results by searching by Smith', async () => {
  const data = await getCharacters({ name: 'smith' });

  expect(data?.characters.info.prev).toBeNull();
  expect(data?.characters.info.next).toBe(2)
  expect(data?.characters.info.count).toBe(3);

  expect(data?.characters.results.map(({ name }) => name)).toEqual(
    expect.arrayContaining(['Morty Smith', 'Summer Smith'])
  )
})

test('Should return one result by status', async () => {
  const data = await getCharacters({ status: 'Dead' });

  expect(data?.characters.info.next).toBeNull()
  expect(data?.characters.info.prev).toBeNull();
  expect(data?.characters.info.count).toBe(1);

  expect(data?.characters.results.map(({ name }) => name)).toEqual(
    expect.arrayContaining(['Summer Smith'])
  )
})

test('Should return one result by status and search', async () => {
  const data = await getCharacters({ status: 'Dead', name: 'Smith' });

  expect(data?.characters.info.next).toBeNull()
  expect(data?.characters.info.prev).toBeNull();
  expect(data?.characters.info.count).toBe(1);

  expect(data?.characters.results.map(({ name }) => name)).toEqual(
    expect.arrayContaining(['Summer Smith'])
  )
})

test('Should return two result by status and search', async () => {
  const data = await getCharacters({ status: 'Alive', name: 'Smith' });

  expect(data?.characters.info.next).toBeNull()
  expect(data?.characters.info.prev).toBeNull();
  expect(data?.characters.info.count).toBe(1);

  expect(data?.characters.results.map(({ name }) => name)).toEqual(
    expect.arrayContaining(['Morty Smith'])
  )
})


test('Should return two result by gender', async () => {
  const data = await getCharacters({ gender: 'Female' });

  expect(data?.characters.info.next).toBeNull()
  expect(data?.characters.info.prev).toBeNull();
  expect(data?.characters.info.count).toBe(2);

  expect(data?.characters.results.map(({ name }) => name)).toEqual(
    expect.arrayContaining(['Beth Smith', 'Summer Smith'])
  )
})

test('Should return one result by gender, status and search', async () => {
  const data = await getCharacters({ gender: 'Female', name: 'Smith', status: 'Dead' });

  expect(data?.characters.info.next).toBeNull()
  expect(data?.characters.info.prev).toBeNull();
  expect(data?.characters.info.count).toBe(1);

  expect(data?.characters.results.map(({ name }) => name)).toEqual(
    expect.arrayContaining(['Summer Smith'])
  )
})
