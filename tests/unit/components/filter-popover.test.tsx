import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import { useState } from "react";
import { expect, test } from "vitest";
import { FilterPopover } from "~/components/filter-popover";

function FilterImplementation() {
  const [state, setState] = useState<Array<{ title: string; value: string }>>(
    [],
  );

  return (
    <FilterPopover
      onReset={() => setState([])}
      groups={[
        {
          title: "Status",
          options: [
            { title: "Alive", value: "Alive" },
            { title: "Dead", value: "Dead" },
          ],
          selected: state.map(({ title }) => title),
          onSelectionChange: (value) => {
            state.some(({ title }) => title === value)
              ? setState((values) =>
                  values.filter(({ title }) => title !== value),
                )
              : setState((values) => [
                  ...values,
                  { title: value as string, value: value as string },
                ]);
          },
        },
      ]}
    />
  );
}

test("Should select and deseclet an option", async () => {
  render(<FilterImplementation />);

  await user.click(screen.getByText(/filtrar/i));

  const input = screen.getByPlaceholderText(/buscar/i);
  expect(input).toBeVisible();

  await user.click(screen.getByText("Alive"));
  const badge = screen.getByTestId("badge-status");
  expect(badge).toBeVisible();

  await user.click(screen.getByText("Alive"));
  expect(badge).not.toBeVisible();
});

test("Should reset filter status", async () => {
  render(<FilterImplementation />);

  await user.click(screen.getByText(/filtrar/i));

  const input = screen.getByPlaceholderText(/buscar/i);
  expect(input).toBeVisible();

  expect(screen.getAllByRole("option")).toHaveLength(3);
  await user.type(input, "Alive");
  expect(screen.getAllByRole("option")).toHaveLength(1);

  await user.type(input, "{backspace}".repeat(5));
  expect(screen.getAllByRole("option")).toHaveLength(3);

  await user.click(screen.getByText("Alive"));
  const badge = screen.getByTestId("badge-status");
  expect(badge).toBeVisible();

  await user.click(screen.getByText(/limpar/i));
  expect(badge).not.toBeVisible();
});
