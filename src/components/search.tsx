"use client";

import { SearchIcon, XIcon } from "lucide-react";
import { useQueryString } from "~/hooks/use-query-string";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function Search() {
  const name = useQueryString("name");

  const updateSearch = (data: FormData) => {
    const term = (data.get("name") ?? "") as string;

    if (term.length) {
      name.update(term);
    }

    if (!term.length) {
      name.remove();
    }
  };

  return (
    <section className="w-full flex flex-col sticky top-0 z-10 py-10 bg-background">
      <div className="w-full container mx-auto space-y-3">
        <form className="w-full gap-2 flex flex-col" action={updateSearch}>
          <label
            htmlFor="search"
            className="text-sm font-bold uppercase text-green-800"
          >
            Pesquisar
          </label>

          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Input
                id="search"
                name="name"
                className="text-sm font-medium flex-1 h-10 border-2 rounded-none border-green-800"
                placeholder="Buscar..."
                defaultValue={name.value}
              />

              {name.value ? (
                <Button
                  type="button"
                  onClick={name.remove}
                  className="absolute right-2 top-1 items-center hover:bg-green-800/20"
                  variant="ghost"
                  size="sm"
                >
                  <XIcon className="size-4" /> Limpar
                </Button>
              ) : null}
            </div>

            <Button className="rounded-none h-10 bg-green-800 hover:bg-green-800/90 focus:bg-green-800/90">
              <SearchIcon className="size-4" />
              Buscar
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
