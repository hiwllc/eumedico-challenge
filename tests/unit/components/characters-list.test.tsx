import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { CharactersList } from "~/components/characters-list";
import { results } from "../../fixtures/data.json";

test("Characters list should contain a list of characters", () => {
  const characters = results.splice(0, 3);

  render(<CharactersList characters={characters} />);

  expect(screen.getAllByRole("img")).toHaveLength(characters.length);

  characters.forEach((character) => {
    expect(screen.getByText(character.name)).toBeVisible();
  });
});

test("Characters list should be empty", () => {
  render(<CharactersList characters={[]} />);
  expect(screen.queryAllByRole("img")).toHaveLength(0);
});
