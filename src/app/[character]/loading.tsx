import { ArrowLeftCircleIcon } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "~/components/ui/skeleton";

export default function Loading() {
  return (
    <article className="flex flex-col gap-6">
      <div className="flex flex-col border-8 border-green-800 md:flex-row">
        <Skeleton className="h-[384px] w-full md:w-[384px] bg-green-800/60 rounded-none" />

        <div className="space-y-1 flex flex-col flex-1 p-4">
          <Skeleton className="h-10 w-full max-w-[300px] bg-green-800/60" />

          <div className="py-2 space-y-1.5">
            <Skeleton className="h-6 max-w-[200px] bg-green-800/60" />
            <Skeleton className="h-6 max-w-[180px] bg-green-800/60" />
            <Skeleton className="h-6 max-w-[140px] bg-green-800/60" />
            <Skeleton className="h-6 max-w-[160px] bg-green-800/60" />
            <Skeleton className="h-6 max-w-[100px] bg-green-800/60" />
            <Skeleton className="h-6 max-w-[80px] bg-green-800/60" />
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
