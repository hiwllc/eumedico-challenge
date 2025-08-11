"use client";

import { FilterIcon } from "lucide-react";
import { useQueryString } from "~/hooks/use-query-string";
import { FilterCheckbox } from "./filter-checkbox";
import { Button } from "./ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";

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

function FilterComponent() {
  const status = useQueryString("status");
  const gender = useQueryString("gender");

  return (
    <>
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
    </>
  );
}

export function Filter() {
  return (
    <>
      <aside className="w-full flex-col space-y-6 hidden md:flex">
        <h4 className="hidden md:block text-sm text-green-800/80 font-bold uppercase py-1">
          Filtrar
        </h4>

        <FilterComponent />
      </aside>

      <Drawer>
        <DrawerTrigger asChild>
          <Button
            className="rounded-full fixed right-6 bottom-6 bg-green-800 z-50 md:hidden"
            size="icon"
          >
            <FilterIcon />
          </Button>
        </DrawerTrigger>

        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle className="font-bold text-2xl uppercase text-green-800">
              Filtrar
            </DrawerTitle>
            <DrawerDescription>Filtre por Status e Gênero.</DrawerDescription>
          </DrawerHeader>

          <div className="p-6">
            <FilterComponent />
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}
