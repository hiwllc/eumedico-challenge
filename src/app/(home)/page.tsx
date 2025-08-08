import { CharactersList } from "~/components/characters-list";
import { Filter } from "~/components/filter";
import { getCharacters } from "~/services/characters";

export default async function Home() {
  const response = await getCharacters();
  const characters = response?.characters.results ?? [];

  return (
    <>
      <Filter />
      <CharactersList characters={characters} />
    </>
  );
}
