import React from "react";
import { render, cleanup, fireEvent, waitFor } from "@testing-library/react";
import TestAsync from "./TestAsync";
import "@testing-library/jest-dom/extend-expect";

afterEach(cleanup);

it("increments counter after 0.5s", async () => {
  const { getByTestId } = render(<TestAsync />);
  fireEvent.click(getByTestId("button-up"));
  await waitFor(() => expect(getByTestId("counter")).toContainHTML('1'))
});