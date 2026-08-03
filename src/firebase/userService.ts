// Imports the FirebaseError class: sing FirebaseError lets TypeScript recognize Firebase-specific errors
import { FirebaseError } from "firebase/app";
// This permanently removes a user's Authentication account 
import { deleteUser } from "firebase/auth";
// Import Firestore functions
import {
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
// Import Firebase services
import { auth, db } from "./firebase";


// Read user profile
// uid: This is the user's Firebase Authentication UID.
export const getUserProfile = async (uid: string) => {
  // Creates a reference to the user's Firestore document
  const userRef = doc(db, "users", uid);
  // Reads the document from Firestore 
  const snapshot = await getDoc(userRef);

  // Checks whether the document exists.
  if (!snapshot.exists()) {
    // This prevents the rest of the function from trying to read missing data
    return null;
  }

  // Returns all fields stored in the Firestore document 
  return snapshot.data();
};


// Update profile
export const updateUserProfile = async (
  uid: string,
  data: {
    name: string;
    address: string;
  }
) => {
  // Creates a reference to the user's Firestore document 
  const userRef = doc(db, "users", uid);

  await updateDoc(userRef, data);
};


// Delete account
export const deleteUserAccount = async () => {
  // Gets the currently logged-in Firebase user 
  const user = auth.currentUser;

  // Checks whether a user is logged in 
  if (!user) {
    throw new Error("No authenticated user.");
  }

  // Error Handling
  try {
    // Delete the Firestore document first
    await deleteDoc(doc(db, "users", user.uid));

    // Then delete the Authentication account
    await deleteUser(user);
  } catch (error) {
    if (error instanceof FirebaseError) {
      console.error("Firebase Error:", error.code, error.message);
      throw error;
    }

    throw error;
  }
};

// Your userService.ts file separates all user-related database operations from 
// your React components. Instead of placing Firestore logic directly inside 
// Profile.tsx, you keep it in one reusable service file. This makes your code 
// cleaner, easier to maintain, and allows the same functions (getUserProfile, 
// updateUserProfile, and deleteUserAccount) to be reused anywhere else in 
// your application if needed.