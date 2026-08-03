// Benefits: Faster navigation, Maintains React application state, Prevents full page reloads
import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import { logoutUser } from "../firebase/authService";
import { onAuthStateChanged, type User } from "firebase/auth";

// useSelector allows a React component to read data from the Redux store
import { useSelector } from "react-redux";
// Imports the TypeScript type describing your Redux state
import type { RootState } from "../redux/store";

// Navbar Component
// This component can be reused anywhere in your application
function Navbar() {
  // Reading Cart Data From Redux: Calls Redux and retrieves data from the store
  const cartItems = useSelector(
    // state: Represents the entire Redux store
    // RootState: The state has this structure
    // state.cart: Gets only the cart portion.
    (state: RootState) => state.cart
  );

  // Track the logged-in user: updates the navbar whenever the user logs in or out
  // Creates two variables that React manages for this state
  // useState() returns an array containing: The current value (user)and a function that updates that value (setUser)
  // The user variable can contain: a Firebase User object or null
  const [user, setUser] = useState<User | null>(null);
  // listens for Firebase authentication changes
  useEffect(() => {
    // onAuthStateChanged() is a Firebase Authentication listener
    // Whenever something changes, Firebase automatically runs your callback
    // If someone is logged in, set it to the current user. 
    // If nobody is logged in, set to null 
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // updates the React state
      setUser(currentUser);
    });

    // stops listening for authentication changes
    return unsubscribe;
  }, []);


  // reduce() loops through the cart array and calculates one final value
  const totalItems = cartItems.reduce(
    // Reduce callback
    // total: is the running total
    // item: is the current product
    (total, item) => total + item.quantity,
    // is the starting value.
    0
  );

  // logoutUser() logs out the user
  const handleLogout = async () => {
    try {
      await logoutUser();
      alert("Logged out successfully.");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    // Navigation Element
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <div className="container">

        {/* Brand Link: Creates the store logo/name */}
        <Link
          className="navbar-brand fw-bold"
          to="/"
        >
          🛍 FakeStore
        </Link>

        {/* Hamburger button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarMenu"
          aria-controls="navbarMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation Buttons Container */}
        <div className="collapse navbar-collapse" id="navbarMenu">
          <div className="navbar-nav ms-auto align-items-lg-center gap-2 mt-3 mt-lg-0">
            {/* Home Button */}
            <Link
              to="/"
              className="btn btn-outline-light"
            >
              Home
            </Link>

            {/* Cart Button */}
            <Link
              to="/cart"
              className="btn btn-warning"
            >
              Cart
              {/* Badge */}
              <span className="badge bg-dark ms-2">
                {/* Displays the calculated cart count */}
                {totalItems}
              </span>
            </Link>

            <Link className="btn btn-outline-light" to="/add-product">
              Add Product
            </Link>

            {user ? (
              <>
                {/* Orders Button */}
                <Link
                  to="/orders"
                  className="btn btn-outline-light"
                >
                  Orders
                </Link>

                {/* Profile Link */}
                <Link className="btn btn-outline-light" to="/profile">
                  Profile
                </Link>

                {/* Logout Button */}
                <button
                  className="btn btn-outline-danger"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link className="btn btn-outline-light" to="/register">
                  Register
                </Link>

                <Link className="btn btn-success" to="/login">
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}


export default Navbar;