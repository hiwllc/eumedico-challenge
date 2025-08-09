import { SearchIcon } from "lucide-react";
import Form from "next/form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function Search() {
  return (
    <section className="w-full flex flex-col sticky top-0 z-10 py-10 bg-background">
      <div className="w-full container mx-auto space-y-3">
        <Form className="w-full gap-2 flex flex-col" action="/">
          <label
            htmlFor="search"
            className="text-sm font-bold uppercase text-green-800"
          >
            Pesquisar
          </label>

          <div className="flex items-center gap-3">
            <Input
              id="search"
              name="q"
              className="text-sm font-medium flex-1 h-10 border-2 rounded-none border-green-800"
              placeholder="Buscar..."
            />

            <Button className="rounded-none h-10 bg-green-800 hover:bg-green-800/90 focus:bg-green-800/90">
              <SearchIcon className="size-4" />
              Buscar
            </Button>
          </div>
        </Form>
      </div>
    </section>
  );
}
