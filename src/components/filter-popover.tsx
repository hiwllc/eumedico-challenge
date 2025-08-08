"use client";

import { PlusCircleIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "./ui/command";
import { Checkbox } from "./ui/checkbox";
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
          className="border-dashed h-10 justify-start"
        >
          <PlusCircleIcon className="size-4" /> Filtrar
          {hasFilters ? (
            <>
              <Separator orientation="vertical" />

              {groups
                .filter(({ selected }) => selected.length)
                .map((group) => (
                  <div
                    key={group.title}
                    data-testid={`badge-${(group.title ?? "").toLocaleLowerCase()}`}
                    className="text-xs font-semibold p-1 px-2 bg-foreground text-background rounded-md"
                  >
                    {group.title}: {group.selected.join("")}
                  </div>
                ))}
            </>
          ) : null}
        </Button>
      </PopoverTrigger>

      <PopoverContent align="start" className="p-0">
        <Command>
          <CommandInput placeholder="Buscar" />
          <CommandList>
            <CommandEmpty>Não encontrado</CommandEmpty>

            {groups.map(({ onSelectionChange, ...group }) => (
              <>
                <CommandGroup key={group.title}>
                  {group.options.map((option) => (
                    <CommandItem
                      key={`${group.title}-${option.value}`}
                      onSelect={() => onSelectionChange(option.title)}
                    >
                      <Checkbox
                        name={option.title}
                        checked={group.selected.includes(option.title)}
                      />
                      {option.title}
                    </CommandItem>
                  ))}
                </CommandGroup>

                <CommandSeparator className="last-of-type:hidden" />
              </>
            ))}
          </CommandList>

          <CommandSeparator />

          <CommandGroup>
            <CommandItem onSelect={onReset}>Limpar</CommandItem>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
