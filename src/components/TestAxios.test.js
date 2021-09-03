import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import axiosMock from "axios";
import TestAxios from "./TestAxios";

jest.mock("axios");

it("should display a loading text", () => {
  const { getByTestId } = render(<TestAxios />);

  expect(getByTestId("loading")).toHaveTextContent("Loading...");
});

it("should load and display the data", async () => {
  const url = './'
  const greeting = 'hello there'
  const { getByTestId } = render(<TestAxios url={url}></TestAxios>)
  axiosMock.get.mockResolvedValueOnce({
    data: { greeting: greeting}
  })
  fireEvent.click(getByTestId("fetch-data"))


  expect(axiosMock.get).toHaveBeenCalledTimes(1); 
  expect(axiosMock.get).toHaveBeenCalledWith(url);
  await waitFor(()=>{
    expect(getByTestId("show-data")).toHaveTextContent(greeting)
  })
  
});