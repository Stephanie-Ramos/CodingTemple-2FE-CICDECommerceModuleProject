// Imports the ShoppingCart component
import ShoppingCart from "../components/ShoppingCart";


// Creates the Cart page component.
function Cart() {
  return (
    // Bootstrap Container: Centers the page and provides left/right spacing
    <div className="container py-4">
      {/* Page Heading */}
      <h1 className="display-5 fw-bold mb-4 text-dark">
        Shopping Cart
      </h1>

      {/* Displays Shopping Cart */}
      <ShoppingCart />
    </div>
  );
}

export default Cart;

// This file is actually one of the simplest components in your 
// project. Its main responsibility is displaying the Cart page and 
// rendering the ShoppingCart component.