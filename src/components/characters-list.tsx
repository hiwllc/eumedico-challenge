import type { Characters } from "~/types/response";
import { CharacterCard } from "./character-card";

type Props = {
  characters: Characters;
  counter?: number;
};

export function CharactersList({ characters, counter = 0 }: Props) {
  return (
    <section className="w-full container mx-auto space-y-4 pb-10 h-fit">
      <h2 className="text-2xl font-extrabold text-green-900 uppercase">
        personagens ({counter})
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
        {characters.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>
    </section>
  );
}
