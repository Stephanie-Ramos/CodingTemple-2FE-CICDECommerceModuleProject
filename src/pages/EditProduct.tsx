import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ProductForm from "../components/ProductForm";
import type { Product } from "../types/Product";

// Import Firestore functions
import { getProduct, updateProduct } from "../services/api";


// Create Component
function EditProduct() {
  // Read URL parameter
  const { id } = useParams();
  // Create navigate function
  const navigate = useNavigate();

  // Product state
  // product = null: initially because the product has not been loaded yet
  const [product, setProduct] = useState<Product | null>(null);

  // It loads the product from Firestore 
  useEffect(() => {
    // Create loadProduct function
    const loadProduct = async () => {
      // Verify the ID exists
      if (!id) return;

      // Load the product: Calls your Firestore service 
      const data = await getProduct(id);

      // Verify product exists
      if (data) {
        // Save product into state
        setProduct(data);
      }
    };

    // Call loadProduct
    loadProduct();
  }, [id]);


  // Handle submit
  const handleSubmit = async (
    // Receives the edited product 
    updatedProduct: Omit<Product, "id">
  ) => {
    // Verifies that the product ID still exists
    if (!id) return;

    // Update Firestore: Calls your Firestore updateProduct service
    await updateProduct(id, updatedProduct);

    // Return home
    navigate("/");
  };

  // Loading state
  if (!product) {
    // Displays: Loading... while Firestore is retrieving the product.
    return <p className="container mt-4">Loading...</p>;
  }

  return (
    <div className="container mt-4">
      <h1 className="text-dark">Edit Product</h1>

      {/* ProductForm */}
      <ProductForm
        initialValues={product}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default EditProduct;
// The EditProduct component acts as the controller for editing existing 
// products. It retrieves the product ID from the URL, loads the 
// corresponding product from Firestore when the page opens, stores it in 
// React state, passes the existing product information to the reusable 
// ProductForm as initialValues, updates the Firestore document when the 
// user submits the form, and finally redirects the user back to the Home 
// page after the update is complete