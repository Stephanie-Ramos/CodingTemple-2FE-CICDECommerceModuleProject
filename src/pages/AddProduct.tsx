import { useNavigate } from "react-router-dom";
import ProductForm from "../components/ProductForm";
import type { Product } from "../types/Product";

// Import Firestore function
import { addProduct } from "../services/api";


// Create Component
function AddProduct() {
  // Create navigate function
  const navigate = useNavigate();

  // Create submit function
  // product: Omit<Product, "id": Function parameter. It creates a new type based on Product without the id property 
  const handleSubmit = async (product: Omit<Product, "id">) => {
    // Error Handling
    try {
      // Save the product
      await addProduct(product);
      navigate("/");
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-dark">Add Product</h1>
      <ProductForm onSubmit={handleSubmit} />
    </div>
  );
}

export default AddProduct;

// The AddProduct component acts as the controller between the form 
// and Firestore. It displays the reusable ProductForm, receives the 
// completed product data when the form is submitted, calls the 
// addProduct() service to save the product in Firestore, handles any 
// errors that occur during the save operation, and then redirects the 
// user back to the Home page once the new product has been successfully 
// added.