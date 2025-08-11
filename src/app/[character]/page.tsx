import { ArrowLeftCircleIcon } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCharacter } from "~/services/character";

type Props = {
  params: Promise<{
    character: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { character: id } = await params;
  const result = await getCharacter(id);

  if (!result) {
    return {
      title: "Personagem não encontrado",
    };
  }

  return {
    title: result.character.name,
  };
}

export default async function CharacterPage({ params }: Props) {
  const { character: id } = await params;
  const result = await getCharacter(id);

  if (!result) {
    return notFound();
  }

  const { character } = result;

  return (
    <article className="flex flex-col gap-6">
      <div className="flex flex-col border-8 border-green-800 md:flex-row">
        <Image
          src={character.image}
          alt={character.name}
          width={480}
          height={320}
          className="w-full md:size-96 object-cover object-center"
        />

        <div className="space-y-1 flex flex-col flex-1 p-4">
          <h2 className="text-4xl font-black decoration-2">{character.name}</h2>

          <div className="py-2">
            <h4 className="text-lf font-semibold">
              <strong>Local:</strong> {character.location.name}
            </h4>
            <h4 className="text-lf font-semibold">
              <strong>Origem:</strong> {character.origin.name}
            </h4>
            <h4 className="text-lf font-semibold">
              <strong>Status:</strong> {character.status}
            </h4>
            <h4 className="text-lf font-semibold">
              <strong>Espécie:</strong> {character.species}
            </h4>
            <h4 className="text-lf font-semibold">
              <strong>Gênero:</strong> {character.gender}
            </h4>
            <h4 className="text-lf font-semibold">
              <strong>Tipo:</strong>{" "}
              {(character.type ?? "").length ? character.type : "N/A"}
            </h4>
          </div>

          <Link
            href="/"
            className="group flex items-center gap-2 text-sm mt-auto"
          >
            <ArrowLeftCircleIcon className="size-5 mt-0.5 group-hover:-translate-x-1 group-focus:-translate-x-1 transition-transform" />
            Voltar Para Página Inicial
          </Link>
        </div>
      </div>
    </article>
  );
}
