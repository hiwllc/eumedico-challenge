"use client";

import { PlusCircleIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "./ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Separator } from "./ui/separator";

type Props = {
  groups: Array<{
    title: string;
    options: Array<{ title: string; value: string }>;
    selected: Array<string>;
    onSelectionChange: (value?: string) => void;
  }>;
  onReset: () => void;
};

export function FilterPopover({ groups, onReset }: Props) {
  const hasFilters = groups.some((group) => group.selected.length > 0);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="border-dashed rounded-none border-2 border-green-800 h-10 justify-start text-green-800 hover:bg-green-200/30"
        >
          <PlusCircleIcon className="size-4" /> Filtrar
          {hasFilters ? (
            <>
              <Separator
                orientation="vertical"
                className="bg-green-800 [data-orientation=vertical]:w-[3px]"
              />

              {groups
                .filter(({ selected }) => selected.length)
                .map((group) => (
                  <div
                    key={group.title}
                    data-testid={`badge-${(group.title ?? "").toLocaleLowerCase()}`}
                    className="text-xs font-semibold p-1 px-2 bg-green-800 text-background"
                  >
                    {group.title}: {group.selected.join("")}
                  </div>
                ))}
            </>
          ) : null}
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        className="p-0 border-3 rounded-none border-green-800"
      >
        <Command>
          <CommandInput placeholder="Buscar" />
          <CommandList>
            <CommandEmpty>Não encontrado</CommandEmpty>

            {groups.map(({ onSelectionChange, ...group }) => (
              <>
                <CommandGroup key={group.title} className="p-0">
                  {group.options.map((option) => (
                    <CommandItem
                      key={`${group.title}-${option.value}`}
                      onSelect={() => onSelectionChange(option.title)}
                      className="hover:bg-green-800/30 rounded-none"
                    >
                      <Checkbox
                        name={option.title}
                        checked={group.selected.includes(option.title)}
                      />
                      {option.title}
                    </CommandItem>
                  ))}
                </CommandGroup>

                <CommandSeparator className="last-of-type:hidden bg-green-800" />
              </>
            ))}
          </CommandList>

          <CommandSeparator className="bg-green-800" />

          <CommandGroup className="p-0">
            <CommandItem onSelect={onReset} className="rounded-none">
              Limpar
            </CommandItem>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
