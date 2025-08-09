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

type Props = {
  searchParams: Promise<{
    page?: number;
  }>;
};

export default async function Home({ searchParams }: Props) {
  const { page: currentPage = 1 } = await searchParams;

  const response = await getCharacters(Number(currentPage));
  const characters = response?.characters.results ?? [];

  const prevPage = response?.characters.info.prev;
  const nextPage = response?.characters.info.next;

  const pages = getPages(currentPage, response?.characters.info.pages ?? 0);

  return (
    <div className="grid grid-cols-[200px_1fr] gap-10 min-h-dvh">
      <Filter />

      <div>
        <CharactersList
          characters={characters}
          counter={response?.characters.info.count}
        />

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
      </div>
    </div>
  );
}
