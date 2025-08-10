import { Filter } from "~/components/filter";
import { Skeleton } from "~/components/ui/skeleton";

export default async function Loading() {
  return (
    <div className="grid grid-cols-[200px_1fr] gap-10 min-h-dvh">
      <Filter />

      <div>
        <section className="w-full container mx-auto space-y-4 pb-10 h-fit">
          <h2 className="text-2xl font-extrabold text-green-900 uppercase">
            personagens (0)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
            {[...Array.from({ length: 4 }).keys()].map((i) => (
              <article
                key={i}
                className="relative transition-shadow focus-within:outline-none border-4 border-green-900"
              >
                <Skeleton className="inline-block h-[220px] w-full bg-green-800/60 rounded-none" />

                <div className="px-4 py-6 h-36 space-y-1">
                  <Skeleton className="h-6 w-[180px] bg-green-700/60" />
                  <Skeleton className="h-4 w-[120px] bg-green-700/60" />
                  <Skeleton className="h-4 w-full bg-green-700/60" />
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
