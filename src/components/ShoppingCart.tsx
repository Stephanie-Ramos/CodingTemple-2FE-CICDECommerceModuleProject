// useDispatch(): Allows the component to send actions to Redux
// useSelector(): Allows the component to read data from the Redux store
import { useDispatch, useSelector } from "react-redux";

import { useState } from "react";

// Import Redux Actions
// clearCart: Removes every product from the cart
// removeFromCart: Deletes one product
// updateQuantity: Changes a product's quantity.
import { clearCart, removeFromCart, updateQuantity } from "../redux/cartSlice";
// Imports the Redux state type
import type { RootState } from "../redux/store";
// Imports a helper function that removes the cart from sessionStorage
import { clearCartStorage } from "../utils/cartStorage";

import { createOrder } from "../firebase/orderService";
import { useNavigate } from "react-router-dom";

// Component
function ShoppingCart() {
  // Redux Dispatch: Every Redux update starts here
  const dispatch = useDispatch();

  // Loading State
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const navigate = useNavigate();

  // Read Redux Cart
  const cartItems = useSelector(
    (state: RootState) => state.cart
  );

  // Calculate total number of products
  const totalItems = cartItems.reduce(
    // Loops through every cart item to add quantities together
    (total, item) => total + item.quantity,
    // Starts counting from zero
    0
  );

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (total, item) =>
      // Calculates each product's subtotal.
      total + item.price * item.quantity,
    0
  );

  // Increase Quantity Function
  const increaseQuantity = (
    // Receives product id and current quantity
    id: string,
    currentQuantity: number
  ) => {
    // Sends an action to Redux.
    dispatch(
      // Calls your reducer
      updateQuantity({
        id,
        quantity: currentQuantity + 1,
      })
    );
  };

  // Decrease Quantity
  const decreaseQuantity = (
    id: string,
    currentQuantity: number
  ) => {

    if (currentQuantity === 1) {
      // Removes the product completely
      dispatch(removeFromCart(id));
      return;
    }

    dispatch(
      updateQuantity({
        id,
        // Otherwise
        quantity: currentQuantity - 1,
      })
    );
  };

  // Checkout Function
  // Function declaration
  // async: This allows the function to use await while Firebase saves the order
  const handleCheckout = async () => {
    // Start error handling 
    try {
      // changes isCheckingOut state to true
      // updates the Checkout button to Processing Order
      setIsCheckingOut(true);

      // Create the Order 
      // calls your createOrder() function from orderService.ts file 
      const orderId = await createOrder(
        cartItems,
        totalPrice
      );

      // Clear Redux cart
      // React automatically updates the cart badge and cart page
      dispatch(clearCart());

      // Clear sessionStorage
      // This removes the saved cart from sessionStorage
      clearCartStorage();

      // Navigate to the Order Details page
      navigate(`/orders/${orderId}`);
    } catch (error) {
    console.error("Checkout error:", error);
    // Turn off loading mode
    setIsCheckingOut(false);
    }
  };

  if (cartItems.length === 0) {
  return (
    <div className="container mt-4">
      <h3>Your cart is empty.</h3>
    </div>
  );
}

  return (
    // Container
    <div className="container py-4 text-dark">
      {/* Bootstrap Row */}
      <div className="row">

        {/* Cart Products on Left Side */}
        <div className="col-lg-8">
          {/* Loop Through Cart */}
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="card shadow-sm mb-4"
            >
              <div className="card-body">
                <div className="row align-items-center">


                  {/* Product Image */}
                  <div className="col-md-4 text-center">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="img-fluid"
                      style={{
                        height: "180px",
                        objectFit: "contain"
                      }}
                      // Image Fallback
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://via.placeholder.com/180";
                      }}

                    />
                  </div>


                  {/* Product Details */}
                  <div className="col-md-8">
                    {/* Product Title */}
                    <h5 className="fw-bold">{item.title}</h5>
                    {/* Category */}
                    <p className="text-muted">{item.category}</p>
                    {/* Price */}
                    <p>Price: ${item.price}</p>

                    {/* Quantity Controls */}
                    <div className="d-flex align-items-center gap-2 mb-3">
                      <strong>Quantity:</strong>

                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() =>
                          decreaseQuantity(
                            item.id,
                            item.quantity
                          )
                        }
                      >
                        -
                      </button>

                      <span>
                        {item.quantity}
                      </span>

                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() =>
                          increaseQuantity(
                            item.id,
                            item.quantity
                          )
                        }
                      >
                        +
                      </button>
                    </div>

                    {/* Subtotal */}
                    <p>Subtotal:{" "}
                      <strong>
                        ${(item.price * item.quantity).toFixed(2)}
                      </strong>
                    </p>
                    
                    {/* Remove Button */}
                    <button
                      className="btn btn-outline-danger"
                      onClick={() =>
                        dispatch(removeFromCart(item.id))
                      }
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>


        {/* Cart Summary */}
        {/* Right Column */}
        <div className="col-lg-4">
          {/* Summary Card */}
          <div className="card shadow-sm p-4">
            {/* Order Summary */}
            <h4 className="fw-bold">Order Summary</h4>

            {/* Horizontal Rule */}
            <hr />

            {/* Total Items */}
            <p>Total Items:{" "}
              <strong>
                {totalItems}
              </strong>
            </p>

            {/* Total Price */}
            <h5>Total Price:{" "}
              <strong>
                ${totalPrice.toFixed(2)}
              </strong>
            </h5>

            {/* Checkout Button */}
            {/* Disables button so the user cannot accidentally submit the same order multiple times */}
            <button
              className="btn btn-success btn-lg mt-3"
              onClick={handleCheckout}
              disabled={isCheckingOut}
            >
              {isCheckingOut ? "Processing Order..." : "Checkout"}
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;