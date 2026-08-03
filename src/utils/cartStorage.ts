import type { Product } from "../types/Product";

interface CartItem extends Product {
  // Adds one extra property
  quantity: number;
}

// getCart(): Its job is to retrieve the shopping cart from sessionStorage
export function getCart(): CartItem[] {
  // Looks inside the browser's sessionStorage
  const storedCart = sessionStorage.getItem("cart");

  // Check if Cart Exists
  if (!storedCart) {
    // if not, return an empty array.
    return [];
  }

  // JSON.parse() converts that text back into a JavaScript array
  return JSON.parse(storedCart);
}

// saveCart(): Creates a function that saves the shopping cart
export function saveCart(cart: CartItem[]) {
  // Save into sessionStorage
  sessionStorage.setItem(
    // This is the storage key
    "cart",
    // Convert Objects into JSON: string is what gets stored in sessionStorage
    JSON.stringify(cart)
  );
}

// clearCartStorage(): Creates a function that deletes the shopping cart from the browser
export function clearCartStorage() {
  // Deletes the key
  sessionStorage.removeItem("cart");
}

// This file is a utility file whose only job is to manage the shopping 
// cart data stored in the browser's sessionStorage. Instead of writing 
// sessionStorage code throughout your application, you place it in one 
// file so it can be reused. Things that it does:
// Redux manages the cart while your application is running.
// cartStorage.ts saves and retrieves the cart from the browser so it 
// isn't lost when the page is refreshed (during the same browser session).