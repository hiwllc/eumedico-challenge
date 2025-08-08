import { CharactersList } from "~/components/characters-list";
import { Filter } from "~/components/filter";
import data from "~/data.json";

export default function Home() {
  return (
    <>
      <Filter />
      <CharactersList characters={data.results} />
    </>
  );
}
