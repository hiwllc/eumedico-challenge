"use client";

import { useCallback } from "react";
import { useQueryString } from "~/hooks/use-query-string";

// const statusOptions = [
//   { title: "Alive", value: "Alive" },
//   { title: "Dead", value: "Dead" },
//   { title: "Unkwnonw", value: "Status Unkwnonw" },
// ];
// const genderOptions = [
//   { title: "Male", value: "Male" },
//   { title: "Female", value: "Female" },
//   { title: "Genderless", value: "Genderless" },
//   { title: "Unkwnown", value: "Gender Unkwnown" },
// ];

/** @todo add filters to aside */
export function Filter() {
  const search = useQueryString("q");

  const onSearch = useCallback(
    (value: string) => {
      value.length > 3 ? search.update(value) : search.remove();
    },
    [search.remove, search.update],
  );

  return (
    <section className="w-full py-10 flex flex-col sticky top-0 z-10 bg-background">
      <div className="w-full container mx-auto space-y-3">
        <h4 className="text-sm font-bold text-foreground uppercase">
          Busca e Filtros
        </h4>
        <form className="w-full gap-4 flex flex-col md:flex-row">
          {/* <FilterSearch onSearch={onSearch} debounce={500} /> */}
        </form>
      </div>
    </section>
  );
}
