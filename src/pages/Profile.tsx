import { useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import {
  getUserProfile,
  updateUserProfile,
  deleteUserAccount,
} from "../firebase/userService";
import { FirebaseError } from "firebase/app";

import { useNavigate } from "react-router-dom";

// Create Component: Profile
function Profile() {
  const navigate = useNavigate();
  // Name State
  const [name, setName] = useState("");
  // Address State
  const [address, setAddress] = useState("");

  // Its purpose is to load the user's profile from Firestore 
  useEffect(() => {
    // This function retrieves the user's profile information 
    const loadProfile = async () => {
      // Get Current User
      const user = auth.currentUser;
      
      // Verify User Exists
      if (!user) return;

      // Retrieve Profile
      const profile = await getUserProfile(user.uid);

      // Check Profile Exists
      if (profile) {
        // || "": If the Firestore document doesn't contain a name yet
        setName(profile.name || "");
        setAddress(profile.address || "");
      }
    };

    loadProfile();
  }, []);


  // Save Profile Function
  const handleSave = async () => {
    // Get Current User
    const user = auth.currentUser;

    // Verify User
    if (!user) return;

    // Update Firestore
    await updateUserProfile(user.uid, {
      name,
      address,
    });

    // Success Message
    alert("Profile updated!");
  };


  // Delete Account Function
  const handleDelete = async () => {
    // Confirmation Dialog
    const confirmed = window.confirm(
      "Are you sure you want to permanently delete your account?",
    );

    // Stop if Cancelled
    if (!confirmed) return;

    try {
      // Delete Account
      await deleteUserAccount();

      // Success Message
      alert("Your account has been deleted.");

      // Navigate Home
      navigate("/");
      // Catch Errors
    } catch (error: unknown) {
        // Print Error
        console.error(error);

        // Firebase Errors
        if (error instanceof FirebaseError) {
            alert(error.code);
        } else {
            alert("Unable to delete account.");
        }
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-dark">My Profile</h2>

      {/* Name Section */}
      <div className="mb-3">
        {/* Name Label */}
        <label>Name</label>

        {/* Name Input */}
        <input
          className="form-control"
          // Current Value: Displays the current name stored in React state 
          value={name}
          // Update State: Runs every time the user types 
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      {/* Address Section */}
      <div className="mb-3">
        <label>Address</label>

        {/* Address Input */}
        <input
          className="form-control"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>

      {/* Save Button */}
      <button className="btn btn-success" onClick={handleSave}>
        Save Profile
      </button>

      {/* Delete Button Section */}
      <div className="mt-4">
        {/* Delete Button */}
        <button className="btn btn-danger" onClick={handleDelete}>
          Delete Account
        </button>
      </div>
    </div>
  );
}

export default Profile;


// The Profile component allows authenticated users to manage their personal 
// information. When the page loads, it retrieves the currently logged-in user's
// profile from Firestore and populates the Name and Address fields. Users can 
// update these fields and save the changes back to Firestore using updateUserProfile(). 
// The component also provides a Delete Account feature, which first asks for 
// confirmation, then permanently deletes both the user's Firestore profile document 
// and their Firebase Authentication account through deleteUserAccount(), and finally 
// redirects the user to the Home page after the account has been removed.