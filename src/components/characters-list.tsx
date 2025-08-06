import type { Characters } from "~/types/response";
import { CharacterCard } from "./character-card";

type Props = {
  characters: Characters;
};

export function CharactersList({ characters }: Props) {
  return (
    <section className="w-full container mx-auto px-6 space-y-4 pb-10 h-fit">
      <h2 className="text-2xl font-extrabold text-foreground/70">
        Todos os personagens
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
        {characters.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>
    </section>
  );
}
