import { render, screen } from "@testing-library/react";
import event from "@testing-library/user-event";
import { afterEach, beforeEach, expect, test, vi } from "vitest";
import { FilterSearch } from "~/components/filter-search";

beforeEach(() => {
  vi.useFakeTimers();

  // Avoid timeout with user events
  // @see https://github.com/testing-library/user-event/issues/1115#issuecomment-1565730917
  // @ts-expect-error globalThis has any
  globalThis.jest = {
    advanceTimersByTime: vi.advanceTimersByTime.bind(vi),
  };
});

test("Should select and deseclet an option", async () => {
  const search = vi.fn();
  const debounce = 10;
  const term = "Rick";

  const user = event.setup({ advanceTimers: vi.advanceTimersByTime });

  render(
    <FilterSearch
      onSearch={search}
      debounce={debounce}
      placeholder="Search"
    />,
  );

  const input = screen.getByPlaceholderText(/search/i);

  await user.type(input, term);
  expect(search).not.toHaveBeenCalledWith(term);

  vi.advanceTimersByTime(debounce + 10);

  expect(search).toHaveBeenCalledWith(term);
  expect(search).toHaveBeenCalledTimes(1);
});

afterEach(() => {
  vi.runOnlyPendingTimers();
  vi.useRealTimers();

  // @ts-expect-error globalThis has any
  delete globalThis.jest;
});
