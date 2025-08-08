import { ArrowLeftCircleIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import data from "~/data-character.json";

type Props = {
  params: Promise<{
    character: string;
  }>;
};

export default async function CharacterPage({ params }: Props) {
  return (
    <article className="flex flex-col gap-6">
      <div className="flex flex-col border-8 border-green-800 md:flex-row">
        <Image
          src={data.image}
          alt={data.name}
          width={480}
          height={320}
          className="w-full md:size-96 object-cover object-center"
        />

        <div className="space-y-1 flex flex-col flex-1 p-4">
          <h2 className="text-4xl font-black decoration-2">{data.name}</h2>

          <div className="py-2">
            <h4 className="text-lf font-semibold">
              <strong>Local:</strong> {data.location.name}
            </h4>
            <h4 className="text-lf font-semibold">
              <strong>Origem:</strong> {data.origin.name}
            </h4>
            <h4 className="text-lf font-semibold">
              <strong>Status:</strong> {data.status}
            </h4>
            <h4 className="text-lf font-semibold">
              <strong>Espécie:</strong> {data.species}
            </h4>
            <h4 className="text-lf font-semibold">
              <strong>Gênero:</strong> {data.gender}
            </h4>
            <h4 className="text-lf font-semibold">
              <strong>Tipo:</strong> {data.type.length ? data.type : "N/A"}
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
