"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export function useQueryString(name: string, defaultValue?: string) {
  const qs = useSearchParams();
  const value = qs.get(name);
  const pathname = usePathname();
  const router = useRouter();

  const update = useCallback(
    (value: string) => {
      const params = new URLSearchParams(qs.toString());
      params.set(name, value);
      router.push(`${pathname}?${params.toString()}`);
    },
    [qs, name, pathname, router],
  );

  const remove = useCallback(() => {
    const params = new URLSearchParams(qs.toString());
    params.delete(name);
    router.push(`${pathname}?${params.toString()}`);
  }, [qs, name, pathname, router]);

  const resetAll = () => {
    router.push(pathname);
  };

  return { update, remove, resetAll, value: value ?? defaultValue };
}
