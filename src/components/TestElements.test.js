import React from "react";
import { render, cleanup, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import TestElements from "./TestElements";

afterEach(cleanup);

it("should equal to 0", () => {
  render(<TestElements />);
  expect(screen.getByTestId("counter")).toHaveTextContent(0);
});
it("should be enabled", () => {
  render(<TestElements />);
  expect(screen.getByTestId("button-up")).not.toHaveAttribute("disabled");
});

it("should be disabled", () => {
  const { getByTestId } = render(<TestElements />);
  expect(getByTestId("button-down")).toBeDisabled();
});