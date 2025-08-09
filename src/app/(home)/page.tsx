import { CharactersList } from "~/components/characters-list";
import { getCharacters } from "~/services/characters";

export default async function Home() {
  const response = await getCharacters();
  const characters = response?.characters.results ?? [];

  return <CharactersList characters={characters} />;
}
