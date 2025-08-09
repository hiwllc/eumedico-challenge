import { CharactersList } from "~/components/characters-list";
import { Filter } from "~/components/filter";
import { getCharacters } from "~/services/characters";

export default async function Home() {
  const response = await getCharacters();
  const characters = response?.characters.results ?? [];

  return (
    <div className="grid grid-cols-[200px_1fr] gap-10 min-h-dvh">
      <Filter />
      <CharactersList characters={characters} />
    </div>
  );
}
