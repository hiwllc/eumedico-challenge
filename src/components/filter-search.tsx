"use client";

import { useEffect, useState } from "react";
import { Input } from "./ui/input";

type Props = {
  onSearch: (value: string) => void;
  initialValue?: string;
  debounce?: number;
  minValueToSearch?: number;
  placeholder?: string;
};

export function FilterSearch({
  onSearch,
  initialValue = "",
  debounce = 300,
  minValueToSearch = 3,
  placeholder = "Buscar personagens",
}: Props) {
  const [term, setTerm] = useState(initialValue);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const search = term.trim();

      if (search.length > minValueToSearch) {
        onSearch(search);
      }
    }, debounce);

    return () => clearTimeout(timeout);
  }, [term, debounce, onSearch, minValueToSearch]);

  return (
    <Input
      className="text-sm font-medium w-full md:max-w-96 h-10"
      placeholder={placeholder}
      value={term}
      onChange={({ target }) => setTerm(target.value)}
    />
  );
}
