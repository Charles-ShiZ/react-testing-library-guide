import React from "react";
import { render, waitForElement, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import axiosMock from "axios";
import TestAxios from "./TestAxios";

jest.mock("axios");

it("should display a loading text", () => {
  const { getByTestId } = render(<TestAxios />);

  expect(getByTestId("loading")).toHaveTextContent("Loading...");
});

it("should load and display the data", async () => {
  const url = "/greeting";
  const { getByTestId } = render(<TestAxios url={url} />); // 渲染组件

  axiosMock.get.mockResolvedValueOnce({
    data: { greeting: "hello there" },
  }); // 拦截并模拟一次请求

  fireEvent.click(getByTestId("fetch-data")); // 点击按钮，触发请求

  const greetingData = await waitForElement(() => getByTestId("show-data")); // 等待数据

  expect(axiosMock.get).toHaveBeenCalledTimes(1);
  expect(axiosMock.get).toHaveBeenCalledWith(url);
  expect(greetingData).toHaveTextContent("hello there");
});
