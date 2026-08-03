// createSlice: Creates a Redux slice. A slice contains:
// the name of the state
// the initial state
// reducers (functions that update the state)
// automatically generated actions

// PayloadAction: This is a TypeScript type. It describes what data (called the payload) is sent with an action
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../types/Product";
// Imports a helper function that reads the shopping cart from sessionStorage
import { getCart } from "../utils/cartStorage";

// CartItem Interace
interface CartItem extends Product {
  // extend Product number with quantity
  quantity: number;
}

// Initial State
// The cart starts empty
// This allows the shopping cart to persist after refreshing the page
const initialState: CartItem[] = getCart();

// Create Slice: Everything inside this object defines how the shopping cart behaves
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {

    // addToCart
    // This recieves current cart, and product being added 
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingProduct = state.find(
        (item) => item.id === action.payload.id
      );

      // If Product already exists, then add one more quantity
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        // Otherwise add new item to car
        state.push({
          ...action.payload,
          quantity: 1,
        });

      }
    },

    // removeFromCart
    // removes Product from cart by ID
    removeFromCart: (state, action: PayloadAction<string>) => {
      const updatedCart = state.filter(
        (item) => item.id !== action.payload
      );

      return updatedCart;
    },

    // clearCart
    clearCart: () => {
      sessionStorage.removeItem("cart");
      return [];
    },

    // updateQuantity
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      // Searches for the product and matches product IDs
      const item = state.find((product) => product.id === action.payload.id);

      // Update Quantity
      if (item) {
        item.quantity = action.payload.quantity;
      }

      // Save Session Storage
      sessionStorage.setItem(
        "cart",
        JSON.stringify(state)
      );

    },
  },
});


export const {
  addToCart,
  removeFromCart,
  clearCart,
  updateQuantity,
} = cartSlice.actions;


export default cartSlice.reducer;

