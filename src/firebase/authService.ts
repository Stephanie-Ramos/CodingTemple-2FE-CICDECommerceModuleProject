// This imports three functions from Firebase Authentication
import {
  // Creates a new Firebase Authentication account using an email address and password
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import {
  doc,
  // Creates or replaces a Firestore document with the data you provide
  setDoc,
} from "firebase/firestore";

// auth: Represents Firebase Authentication
// db: Represents your Cloud Firestore database
import { auth, db } from "./firebase";

// Register
export const registerUser = async (
  email: string,
  password: string
) => {
  // Create the Authentication account
  const userCredential =
    await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

  // Create user document in Firestore
  // Uses Firestore's setDoc() function to create a document
  // doc(db, "users", userCredential.user.uid): Creates a document reference
  await setDoc(doc(db, "users", userCredential.user.uid), {
    email,
    // can update profile information
    name: "",
    address: "",
    createdAt: new Date(),
  });

  // Returns the Firebase User object to the file that called registerUser()
  return userCredential.user;
};

// Login function 
export const loginUser = async (
  email: string,
  password: string
) => {
  const userCredential =
    await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

  return userCredential.user;
};

// Logout
export const logoutUser = async () => {
  await signOut(auth);
};