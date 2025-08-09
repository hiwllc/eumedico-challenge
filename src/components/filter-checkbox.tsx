"use client";

import { Checkbox } from "./ui/checkbox";

type Props = {
  title: string;
  options: Array<{
    title: string;
    value: string;
  }>;
  selected?: string;
  onCheckedValueChage: (value: string) => void;
};

export function FilterCheckbox({
  options,
  title,
  selected,
  onCheckedValueChage,
}: Props) {
  return (
    <div className="space-y-2">
      <h5 className="text-xs text-green-800/80 uppercase font-bold">{title}</h5>

      <div>
        {options.map((option) => (
          <label
            htmlFor={option.title}
            key={option.value}
            className="flex items-center gap-2 text-sm font-medium"
          >
            <Checkbox
              id={option.title}
              checked={selected === option.title || selected === option.value}
              onCheckedChange={() => onCheckedValueChage(option.title)}
            />
            {option.title}
          </label>
        ))}
      </div>
    </div>
  );
}
