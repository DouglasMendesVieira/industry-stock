import { render, screen } from "@testing-library/react";
import { vi } from "vitest";

vi.mock("../context/ToastContext", () => ({
  useToast: () => ({
    showToast: vi.fn(),
  }),
}));

vi.mock("../hooks/useProducts", () => ({
  default: () => ({
    products: [],
    loading: false,
    reload: vi.fn(),
  }),
}));

import Products from "./Products";

test("renders product title", () => {
  render(<Products />);

  expect(
    screen.getByRole("heading", { name: /products/i })
  ).toBeInTheDocument();
});
