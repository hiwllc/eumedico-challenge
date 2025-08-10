import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { CharacterCard } from "~/components/character-card";
import { results } from "../../fixtures/data.json";

test("Character information should be visible in character card", () => {
  const character = results[0];

  render(<CharacterCard character={character} />);

  expect(screen.getByAltText(character.name)).toBeVisible();
  expect(screen.getByText(character.name)).toBeVisible();

  expect(screen.getByRole("heading", { level: 5 })).toHaveTextContent(
    `Location: ${character.location.name}`,
  );

  expect(screen.getByRole("heading", { level: 4 })).toHaveTextContent(
    `Status: ${character.status}`,
  );

  const link = screen.getByRole("link", {
    name: `Ver detalhes do personagem ${character.name}`,
  });

  expect(link).toBeInTheDocument();
  expect(link).toHaveAttribute("href", `/${character.id}`);
});
