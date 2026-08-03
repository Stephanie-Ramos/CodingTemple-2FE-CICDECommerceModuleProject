// In this component, it stores the values entered into the form fields
import { useState } from "react";
import type { Product } from "../types/Product";

type ProductFormProps = {
  // ?: Means this prop is optional. The component can be used without passing it
  // Partial<Product>: every property becomes optional
  initialValues?: Partial<Product>;
  // This prop receives a function
  // Omit<Product, "id">: Creates a Product object without the id property because Firestore 
  // generates document IDs automatically when creating a new product
  onSubmit: (product: Omit<Product, "id">) => void;
};

// Component
function ProductForm({
  // If no initialValues are passed, React uses an empty object
  initialValues = {},
  // Receives the submit function from the parent component
  onSubmit,
  // The same form used for AddProduct and EditProduct
}: ProductFormProps) {
  // State Variables
  const [title, setTitle] = useState(initialValues.title || "");
  const [price, setPrice] = useState(initialValues.price || 0);
  const [description, setDescription] = useState(
    initialValues.description || ""
  );
  const [category, setCategory] = useState(
    initialValues.category || ""
  );
  const [image, setImage] = useState(initialValues.image || "");

  // Handle Submit
  // Creates the function that runs when the user submits the form 
  const handleSubmit = (e: React.FormEvent) => {
    // Stops the browser from refreshing the page
    e.preventDefault();

    // Calls the function received from the parent component
    onSubmit({
      title,
      price,
      description,
      category,
      image,
    });
  };

  return (
    // Form
    // When the user presses Save Product, React calls handleSubmit() 
    <form onSubmit={handleSubmit} className="container mt-4">
      {/* Heading */}
      <h2 className="text-dark">Product</h2>

      {/* Title Input */}
      <input
        className="form-control mb-3"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

    {/* Price Input */}
      <input
        className="form-control mb-3"
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
      />

      {/* Category Input */}
      <input
        className="form-control mb-3"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      {/* Image URL Input */}
      <input
        className="form-control mb-3"
        placeholder="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      {/* Description Input */}
      <textarea
        className="form-control mb-3"
        placeholder="Description"
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button className="btn btn-success">
        Save Product
      </button>

    </form>
  );
}

export default ProductForm;

// The ProductForm component is a reusable form for creating and 
// editing products. It manages the form data using React state, 
// displays existing values when editing a product, and sends the 
// completed product information to a parent component through 
// the onSubmit function. This approach allows the same form 
// component to be reused for both adding new products and 
// updating existing ones, reducing duplicate code and making the 
// application easier to maintain.