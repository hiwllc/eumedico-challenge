"use client";

import { useQueryString } from "~/hooks/use-query-string";
import { FilterCheckbox } from "./filter-checkbox";

const filters = {
  status: {
    title: "Status",
    options: [
      { title: "Alive", value: "Alive" },
      { title: "Dead", value: "Dead" },
      { title: "Unknown", value: "Status Unknown" },
    ],
  },
  gender: {
    title: "Gênero",
    options: [
      { title: "Male", value: "Male" },
      { title: "Female", value: "Female" },
      { title: "Genderless", value: "Genderless" },
      { title: "Unkwnown", value: "Gender Unkwnown" },
    ],
  },
};

export function Filter() {
  const status = useQueryString("status");
  const gender = useQueryString("gender");

  return (
    <aside className="w-full flex flex-col space-y-6">
      <h4 className="text-sm text-green-800/80 font-bold uppercase py-1">
        Filtrar
      </h4>

      <FilterCheckbox
        title={filters.status.title}
        options={filters.status.options}
        selected={status.value}
        onCheckedValueChage={(option) =>
          option === status.value ? status.remove() : status.update(option)
        }
      />

      <FilterCheckbox
        title={filters.gender.title}
        options={filters.gender.options}
        selected={gender.value}
        onCheckedValueChage={(option) =>
          option === gender.value ? gender.remove() : gender.update(option)
        }
      />
    </aside>
  );
}
