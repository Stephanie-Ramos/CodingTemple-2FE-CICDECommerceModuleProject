import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ProductCard from "./ProductCard";
import cartReducer from "../redux/cartSlice";
import type { Product } from "../types/Product";

// jest.mock() tells Jest: Don't use the real module. Instead, replace it with a fake version while running this test
// "../services/api": This is the exact module that ProductCard imports
jest.mock("../services/api", () => ({
  // The fake module: This object represents the fake api.ts 
  // jest.fn()creates a mock function. With the mock, the Firebase code is skipped entirely
  deleteProduct: jest.fn(),
}));

// Creates a sample product used only during testing.
const mockProduct = {
  id: "product-1",
  title: "Test Backpack",
  price: 49.99,
  description:
    "A durable backpack created specifically for testing the ProductCard component.",
  category: "Accessories",
  image: "test-backpack.jpg",
// satisfies Product: TypeScript checks that the object actually follows the Product interface
} satisfies Product;

// Creates a fresh Redux store for each test
function createTestStore() {
  return configureStore({
    reducer: {
      cart: cartReducer,
    },
  });
}

// Renders ProductCard with the providers it needs
function renderProductCard() {
  const store = createTestStore();

  render(
    <Provider store={store}>
      <MemoryRouter>
        <ProductCard product={mockProduct} />
      </MemoryRouter>
    </Provider>
  );

  return store;
}

describe("ProductCard", () => {
  // This setup prevents a previous test or browser value from affecting the current test:
  beforeEach(() => {
    sessionStorage.clear();
    // clears mocks helps keep the test file independent
    jest.clearAllMocks(); 
  });

  // checks that users can see: Product title, Category, Price, Product image, and Add to Cart button
  test("renders the product information", () => {
    renderProductCard();

    // It searches for a heading whose accessible name is Test Backpack
    expect(
      screen.getByRole("heading", {
        name: "Test Backpack",
      })
    ).toBeInTheDocument();

    expect(
      screen.getByText("Accessories")
    ).toBeInTheDocument();

    expect(
      screen.getByText("$49.99")
    ).toBeInTheDocument();

    expect(
      screen.getByRole("img", {
        name: "Test Backpack",
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: "Add to Cart",
      })
    ).toBeInTheDocument();
  });

  // second test begins with an empty cart   
  test("adds the product to the Redux cart when clicked", async () => {
    const user = userEvent.setup();
    const store = renderProductCard();

    // It clicks 
    await user.click(
      screen.getByRole("button", {
        name: "Add to Cart",
      })
    );

    // Then it retrieves the Redux state 
    const cart = store.getState().cart;

    // Finally, it verifies that your actual addToCart reducer added the product with a quantity of 1
    expect(cart).toHaveLength(1);
    expect(cart[0].id).toBe("product-1");
    expect(cart[0].title).toBe("Test Backpack");
    expect(cart[0].quantity).toBe(1);
  });
});