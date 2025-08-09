import Image from "next/image";
import Link from "next/link";
import type { Character } from "~/types/response";

type Props = {
  character: Pick<Character, "id" | "image" | "name" | "location" | "status">;
};

export function CharacterCard({ character }: Props) {
  return (
    <article
      key={character.id}
      className="relative transition-shadow focus-within:outline-none border-4 border-green-900"
    >
      <Image
        src={character.image}
        width={320}
        height={460}
        alt={character.name}
        className="w-full object-cover object-center"
      />
      <div className="px-4 py-6 h-36">
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
