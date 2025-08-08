"use client";

import { useEffect, useState } from "react";
import { Input } from "./ui/input";

type Props = {
  onSearch: (value: string) => void;
  initialValue?: string;
  debounce?: number;
  placeholder?: string;
};

export function FilterSearch({
  onSearch,
  initialValue = "",
  debounce = 300,
  placeholder = "Buscar personagens",
}: Props) {
  const [term, setTerm] = useState(initialValue);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onSearch(term.trim());
    }, debounce);

    return () => clearTimeout(timeout);
  }, [term, debounce, onSearch]);

  return (
    <Input
      className="text-sm font-medium w-full md:max-w-96 h-10 border-2 rounded-none border-green-800"
      placeholder={placeholder}
      value={term}
      onChange={({ target }) => setTerm(target.value)}
    />
  );
}
