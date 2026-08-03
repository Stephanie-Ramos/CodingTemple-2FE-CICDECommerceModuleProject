import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { registerUser } from "../firebase/authService";


// Create Component: Register
function Register() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Create Submit Function
  const handleSubmit = async (
    // Form Event
    e: React.FormEvent
  ) => {
    // Prevent Page Refresh
    e.preventDefault();

    //  Error Handling
    try {
      // Register User
      await registerUser(email, password);

      // Success Message
      alert("Registration successful!");

      // Navigate Home
      navigate("/");

      // Catch Errors
    } catch (error) {
      console.error(error);
      // Display Error Message
      alert("Registration failed.");
    }
  };

  return (
    <div className="container mt-4">
      {/* Page Heading */}
      <h2 className="text-dark">Register</h2>
      {/* Form */}
      <form onSubmit={handleSubmit}>

        {/* Email Input */}
        <input
          className="form-control mb-3"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        {/* Password Input */}
        <input
          className="form-control mb-3"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        {/* Register Button */}
        <button className="btn btn-primary">
          Register
        </button>

      </form>

    </div>
  );
}

export default Register;

// The Register component manages the account creation process for new users. 
// It stores the user's email and password using React state, prevents the 
// browser from refreshing when the form is submitted, and calls the reusable 
// registerUser() function from authService.ts. That service creates a new 
// Firebase Authentication account and a corresponding Firestore user profile 
// document. After a successful registration, the component displays a success 
// message and redirects the user to the Home page. If registration fails, it 
// logs the error to the browser console and displays a message informing the 
// user that the registration was unsuccessful.