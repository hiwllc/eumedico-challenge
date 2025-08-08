import { CharactersList } from "~/components/characters-list";
import { results } from "~/data.json";

export default function Home() {
  return <CharactersList characters={results} />;
}
