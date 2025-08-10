import { Suspense } from "react";
import { CharactersList } from "~/components/characters-list";
import { Filter } from "~/components/filter";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination";
import { getPages } from "~/lib/pages";
import { getCharacters } from "~/services/characters";
import type { Gender, Status } from "~/types/response";

type Props = {
  searchParams: Promise<{
    page?: number;
    name?: string;
    status?: Status;
    gender?: Gender;
  }>;
};

export default async function Home({ searchParams }: Props) {
  const { page: currentPage = 1, name, status, gender } = await searchParams;

  const response = await getCharacters({
    page: Number(currentPage),
    name,
    status,
    gender,
  });
  const characters = response?.characters.results ?? [];

  const prevPage = response?.characters.info.prev;
  const nextPage = response?.characters.info.next;
  const count = response?.characters.info.count ?? 0;

  const pages = getPages(currentPage, response?.characters.info.pages ?? 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-10 min-h-dvh">
      <Suspense>
        <Filter />
      </Suspense>

      <div>
        <CharactersList
          characters={characters}
          counter={response?.characters.info.count ?? 0}
        />

        {count > 1 ? (
          <Pagination>
            <PaginationContent className="py-6">
              {prevPage ? (
                <PaginationItem>
                  <PaginationPrevious
                    href={`/?page=${prevPage}`}
                    className="rounded-none hover:bg-green-800/20 text-green-800"
                  />
                </PaginationItem>
              ) : null}

              {pages.map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    href={`/?page=${page}`}
                    isActive={page === Number(currentPage)}
                    className="data-[active=true]:border-green-800 rounded-none data-[active=true]:border-2 hover:bg-green-800/20 text-green-800"
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}

              {currentPage < (response?.characters.info.pages ?? 0) ? (
                <PaginationItem>
                  <PaginationEllipsis className="text-green-800" />
                </PaginationItem>
              ) : null}

              {nextPage ? (
                <PaginationItem>
                  <PaginationNext
                    href={`/?page=${response?.characters.info.next}`}
                    className="rounded-none hover:bg-green-800/20 text-green-800"
                  />
                </PaginationItem>
              ) : null}
            </PaginationContent>
          </Pagination>
        ) : null}
      </div>
    </div>
  );
}
