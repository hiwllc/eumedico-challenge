import Image from "next/image";
import Link from "next/link";
import type { Character } from "~/types/response";

type Props = {
  character: Character;
};

export function CharacterCard({ character }: Props) {
  return (
    <article
      key={character.id}
      className="relative rounded-md hover:shadow-2xl transition-shadow focus-within:outline-none focus-within:shadow-2xl"
    >
      <Image
        src={character.image}
        width={320}
        height={460}
        alt={character.name}
        className="w-full object-cover object-center rounded-md rounded-b-none"
      />
      <div className="px-4 py-6 border-2 border-t-0 rounded-b-md h-36">
        <h3 className="font-bold">{character.name}</h3>
        <h4 className="text-sm font-semibold">Status: {character.status}</h4>
        <h5 className="text-sm font-medium">
          Location: {character.location.name}
        </h5>

        <Link
          href={`/${character.id}`}
          className="absolute inset-0 focus:outline-none"
        >
          <span className="sr-only">
            Ver detalhes do personagem {character.name}
          </span>
        </Link>
      </div>
    </article>
  );
}
