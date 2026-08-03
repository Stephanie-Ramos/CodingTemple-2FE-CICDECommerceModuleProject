import {
  collection,
  getDocs,
  getDoc,
  query,
  where,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";


import { db } from "../firebase/firebase";
import type { Product } from "../types/Product";

// Get all products
export const getProducts = async (): Promise<Product[]> => {
  const snapshot = await getDocs(collection(db, "products"));

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Product, "id">),
  }));
};


// Get a single product
export const getProduct = async (
  id: string
): Promise<Product | null> => {
  const docRef = doc(db, "products", id);
  const snapshot = await getDoc(docRef);

  if (!snapshot.exists()) {
    return null;
  }

  return {
    id: snapshot.id,
    ...(snapshot.data() as Omit<Product, "id">),
  };
};


// Get all categories
export const getCategories = async (): Promise<string[]> => {
  const snapshot = await getDocs(collection(db, "products"));

  const categories = snapshot.docs.map(
    (doc) => doc.data().category as string
  );

  return [...new Set(categories)];
};


// Get products by category
export const getProductsByCategory = async (
  category: string
): Promise<Product[]> => {
  const q = query(
    collection(db, "products"),
    where("category", "==", category)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Product, "id">),
  }));
};


// Add product: creates a new document in the products collection
export const addProduct = async (
  product: Omit<Product, "id">
): Promise<void> => {
  await addDoc(collection(db, "products"), product);
};


// Update Product: finds a product by its Firestore document ID and updates it
export const updateProduct = async (
  id: string,
  product: Omit<Product, "id">
): Promise<void> => {
  const productRef = doc(db, "products", id);

  await updateDoc(productRef, {
    ...product,
  });
};


// Delete Product: deletes the selected product document from Firestore
export const deleteProduct = async (
  id: string
): Promise<void> => {
  await deleteDoc(doc(db, "products", id));
};