// In this component, it stores: the user's email and the user's password
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// Instead of putting Firebase Authentication code inside this component, the login logic is stored in authService.ts
import { loginUser } from "../firebase/authService";
import { FirebaseError } from "firebase/app";

// Create Component
function Login() {
  // Create navigate function
  const navigate = useNavigate();

  // Email and Password states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Create submit function
  // React.FormEvent: Tells TypeScript that this event came from an HTML form.
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Begin Error Handling
    try {
      // Calls your custom authentication function 
      await loginUser(email, password);

      alert("Login successful!");

      navigate("/");
    } catch (error: unknown) {
        console.error(error);

        // Firebase errors: Checks whether the error came from Firebase 
        if (error instanceof FirebaseError) {
            // Displays the Firebase error code 
            alert(error.code);
        } else if (error instanceof Error) {
            alert(error.message);
        } else {
            alert("An unexpected error occurred.");
        }
    }
  };

  return (
    <div className="container mt-4">
      {/* Page heading */}
      <h2 className="text-dark">Login</h2>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        {/* Email Input */}
        <input
          className="form-control mb-3"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password Input */}
        <input
          className="form-control mb-3"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Login button */}
        <button className="btn btn-success">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;

// The Login component manages the user authentication process. 
// It stores the user's email and password using React state, 
// submits the credentials to Firebase Authentication through 
// the reusable loginUser() service, prevents the page from 
// refreshing during submission, handles Firebase and JavaScript 
// errors appropriately, and redirects the user to the Home page 
// after a successful login. By keeping the authentication logic 
// in authService.ts, the component remains focused on handling 
// user input and updating the interface