import { expect, test } from "vitest";
import { getPages } from "~/lib/pages";

test('Should return sliced pages', async () => {
  expect(getPages(1, 42)).toEqual([1,2,3])
  expect(getPages(3, 42)).toEqual([2,3,4])
  expect(getPages(41, 42)).toEqual([40,41,42])
})
