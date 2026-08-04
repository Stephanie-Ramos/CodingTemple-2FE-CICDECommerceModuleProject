// This imports Redux Toolkit’s configureStore() function
// The test uses it to create a new Redux store containing your actual cart reducer
import { configureStore } from "@reduxjs/toolkit";
// Provider makes the Redux store available to React components:
// ProductCard uses useDispatch()
// ShoppingCart uses useDispatch() and useSelector()
import { Provider } from "react-redux";
// MemoryRouter is designed for testing because it stores navigation history in memory instead of changing the browser’s real URL
// ProductCard contains a <Link>
// ShoppingCart uses useNavigate()
import { MemoryRouter } from "react-router-dom";
// render places React components into Jest’s simulated browser document
// screen provides queries for locating visible elements such as screen.getByRole(...)
import { render, screen } from "@testing-library/react";
// This imports userEvent, which simulates realistic user interactions. In this test, it is used to click the Add to Cart button
import userEvent from "@testing-library/user-event";

// imports deleteProduct: must be mocked to avoid the import.meta.env error
import ProductCard from "../components/ProductCard";
// imports createOrder: mocks to prevent Firebase initialization during the test
import ShoppingCart from "../components/ShoppingCart";
// The cart reducer handles cart actions such as: addToCart, removeFromCart, clearCart, updateQuantity 
import cartReducer from "../redux/cartSlice";
import type { Product } from "../types/Product";

// Prevent ProductCard from loading the real Firestore API as it mocks it 
jest.mock("../services/api", () => ({
  // ProductCard imports deleteProduct, and the real API module eventually loads your Firebase configuration as a mock
  deleteProduct: jest.fn(),
}));

// Prevent ShoppingCart from loading the real Firebase order service as a mock 
jest.mock("../firebase/orderService", () => ({
  // ShoppingCart imports createOrder() for checkout
  createOrder: jest.fn(),
}));

// Test product: This creates sample product data used only in the test
const mockProduct = {
  id: "product-1",
  title: "Test Backpack",
  price: 49.99,
  description:
    "A durable backpack created specifically for integration testing.",
  category: "Accessories",
  // The test does not need to load a real image from the internet
  image: "test-backpack.jpg",
 // satisfies Product: tells TypeScript to verify that the object follows the Product interface. 
 // It checks for missing or incorrectly typed properties instead of simply telling TypeScript to trust the object 
} satisfies Product;

// Creating the test store: This defines a helper function that creates a Redux store.
function createTestStore() {
    // This creates and returns the store
    return configureStore({
    // This configures the Redux state structure
    reducer: {
      cart: cartReducer,
    },
  });
}

// Test group
// describe(): groups related tests together.
describe("ProductCard and ShoppingCart integration", () => {
  // Setup before each test
  // beforeEach(): runs before every test inside this describe() block
  beforeEach(() => {
    // This clears stored cart data to ensure that the cart starts empty
    sessionStorage.clear();
    // This clears the recorded calls from all mock functions: deleteProduct, createOrder
    jest.clearAllMocks();
  });

  // Integration test: It is marked async because userEvent actions such as clicking return Promises
  test("updates the ShoppingCart when a product is added", async () => {
    // This creates a simulated user 
    const user = userEvent.setup();
    // This creates a fresh Redux store for the test
    const store = createTestStore();

    // This begins rendering the test interface 
    render(
      // This gives ProductCard and ShoppingCart access to the same Redux store
      // When ProductCard updates the store, ShoppingCart can observe the same update
      <Provider store={store}>
        <MemoryRouter>
          {/* This renders the real product card using the test product */}
          <ProductCard product={mockProduct} />
          {/* This renders the real shopping cart beside the product card. */}
          <ShoppingCart />
        </MemoryRouter>
      </Provider>,
    );

    // The cart should begin empty
    expect(
      // This searches for a heading
      screen.getByRole("heading", {
        name: "Your cart is empty.",
      }),
    // This verifies that the empty-cart heading is currently displayed
    ).toBeInTheDocument();

    // Add the product through ProductCard to the Shopping Cart.
    // This simulates a real user click 
    await user.click(
      screen.getByRole("button", {
        name: "Add to Cart",
      }),
    );

    // ShoppingCart should automatically re-render.
    // This confirms that the empty-cart message is no longer displayed 
    // When an element is absent: getByRole() throws an error and queryByRole() returns null
    expect(
      screen.queryByRole("heading", {
        name: "Your cart is empty.",
      }),
    ).not.toBeInTheDocument();

    // Confirming the product appears in both components
    // getAllByRole() returns every heading named Test Backpack.
    // There should be two: The title in ProductCard and t\he title in ShoppingCart
    expect(
      screen.getAllByRole("heading", {
        name: "Test Backpack",
      }),
    // verifies that exactly two matching headings exist 
    ).toHaveLength(2);

    // Confirming total quantity
    expect(
      screen.getByText("Total Items:").parentElement
    ).toHaveTextContent("Total Items: 1",);

    // Confirming total price
    expect(
      screen.getByText("Total Price:").parentElement
    ).toHaveTextContent("Total Price: $49.99",
    );
  });
});
