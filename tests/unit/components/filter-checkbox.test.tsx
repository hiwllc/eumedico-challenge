import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import { useState } from "react";
import { expect, test } from "vitest";
import { FilterCheckbox } from "~/components/filter-checkbox";
// import { FilterPopover } from "~/components/filter-popover";

function FilterImplementation() {
  const [state, setState] = useState<string>();

  return (
    <FilterCheckbox
      title="Status"
      options={[
        { title: "Alive", value: "Alive" },
        { title: "Dead", value: "Dead" },
      ]}
      onCheckedValueChage={setState}
      selected={state}
    />
  );
}

test("Should select and deseclet an option", async () => {
  render(<FilterImplementation />);

  expect(screen.getByText(/status/i)).toBeVisible()

  await user.click(screen.getByText(/alive/i))
  expect(screen.getByRole('checkbox', { name: 'Alive' })).toBeChecked()
  expect(screen.getByRole('checkbox', { name: 'Dead' })).not.toBeChecked()

  await user.click(screen.getByText(/dead/i))
  expect(screen.getByRole('checkbox', { name: 'Alive' })).not.toBeChecked()
  expect(screen.getByRole('checkbox', { name: 'Dead' })).toBeChecked()
});
