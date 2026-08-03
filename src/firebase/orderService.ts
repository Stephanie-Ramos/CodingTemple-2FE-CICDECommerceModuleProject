// This imports several Firestore functions.
import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  orderBy,
  Timestamp,
  doc,
  getDoc
} from "firebase/firestore";

// Import the Firebase services
import { db, auth} from "./firebase";

// Import the Product type
import type { Product } from "../types/Product";
// Import the Order type
import type { Order } from "../types/Order";


// CartItem type
type CartItem = Product & {
  // Adds one extra property
  quantity: number;
};

// Create Order
export const createOrder = async (
  cartItems: CartItem[],
  totalPrice: number
  // This tells TypeScript that the function returns a Promise that eventually resolves to a string
): Promise<string> => {
  // Gets the currently authenticated Firebase user
  const user = auth.currentUser;

  // Checks whether user is missing or logged in 
  if (!user) {
    // This prevents an order from being created without a user ID 
    throw new Error("User is not logged in.");
  }

  // Creates a new document in the Firestore orders collection
  const docRef = await addDoc(collection(db, "orders"), {
    userId: user.uid,
    createdAt: Timestamp.now(),
    totalPrice,
    products: cartItems,
  });
  // Returns the newly generated Firestore order ID
  // The checkout function uses this ID to navigate directly to the order details page
  return docRef.id;
};

// Get current user's all orders
// only returns orders that belong to the currently logged in user
// Promise<Order[]>: returns a Promise that resolves to an array of Order objects
export const getOrders = async (): Promise<Order[]> => {
  // Gets the currently logged-in user 
  const user = auth.currentUser;

  if (!user) {
    console.log("No logged in user");
    return [];
  }

  // Create the Firestore query
  const q = query(
    // Starts with the orders collection 
    collection(db, "orders"),
    // Filters the orders
    where("userId", "==", user.uid),
    // Sorts the matching orders by the createdAt field 
    orderBy("createdAt", "desc")
  );

  // Runs the query
  // getDocs(q): retrieves all matching order documents
  const snapshot = await getDocs(q);

  // Loops through every returned Firestore document
  return snapshot.docs.map((docSnapshot) => ({
    // Adds the Firestore document ID to the returned order object 
    id: docSnapshot.id,
    // returns an object: userID, createdAt, totalPrice, products
    // as Omit<Order, "id">: Treat the Firestore data as an Order object without the id field 
    ...(docSnapshot.data() as Omit<Order, "id">),
  }));
};

// Get one order
// Promise<Order | null>: This means the function eventually returns either: order object or null 
export const getOrder = async (id: string): Promise<Order | null> => {
  // creates a reference to one order document.
  const snapshot = await getDoc(doc(db, "orders", id));

  // Checks whether the document exists 
  if (!snapshot.exists()) {
    return null;
  }

  return {
    // Adds the Firestore document ID
    id: snapshot.id,
    // Gets the order fields from Firestore and spreads them into the returned object
    ...(snapshot.data() as Omit<Order, "id">),
  };
};