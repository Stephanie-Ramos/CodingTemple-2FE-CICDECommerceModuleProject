// useDispatch allows a component to send actions to the Redux store
import { useDispatch } from "react-redux";
// Imports the addToCart action from your Redux slice
// Redux sends the product to the addToCart reducer, which either:
// increases the quantity if the product is already in the cart, or
// adds a new product with a quantity of 1.
import { addToCart } from "../redux/cartSlice";
// The Product interface describes the structure of a product received from the FakeStore API
import type { Product } from "../types/Product";

import { Link } from "react-router-dom";

import { deleteProduct } from "../services/api";

// Define Props
type ProductCardProps = {
  product: Product;
};

// Component
function ProductCard({ product }: ProductCardProps) {
  // Redux Dispatch: This gives the component access to Redux 
  const dispatch = useDispatch();

  // It will be called when the user clicks the Delete button
  // asynchronous: This allows you to use the await keyword to wait for long-running tasks (such as deleting a document from Firestore) before continuing
  // arrow function: when this function is called, execute the code inside the braces
  const handleDelete = async () => {
    // window.confirm(): Displays a browser confirmation dialog, ok or cancel 
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );
    // if the user did not confirm, immediately exit the function
    if (!confirmed) return;

    // try, catch block for error handling
    try {
      // await: Waits until Firestore finishes deleting the product.
      // deleteProduct(): Calls your Firestore service function which deletes the product document from Firestore
      // product.id: Passes the Firestore document ID.
      await deleteProduct(product.id);

      // Refresh the page so the product list updates
      window.location.reload();
      // if something goes wrong during the deletion
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    // Bootstrap Card
    <div className="card h-100">
      {/* Product Image */}
      <img
        // Image Source
        src={product.image}
        // Bootstrap Styling
        className="card-img-top p-3"
        // Accessibility
        alt={product.title}
        // Inline Styling
        style={{ height: "250px", objectFit: "contain" }}
        // Image Error Handling
        onError={(e) => {
          // Instead of showing a broken image icon, users see: Placeholder Image
          e.currentTarget.src = "https://via.placeholder.com/250";
        }}
      />

      {/* Card Body */}
      <div className="card-body d-flex flex-column">
        {/* Product Title */}
        <h5
          className="card-title"
          style={{ minHeight: "60px" }}
        >
          {/* Displays the product title */}
          {product.title}
        </h5>

        {/* Displays the product category */}
        <p>{product.category}</p>

        {/* Displays the description using Bootstrap's muted gray text */}
        <p className="text-muted">
          {/* Takes only the first 100 characters */}
          {product.description.substring(0, 100)}...
        </p>

        {/* Price */}
        <h4 className="text-success fw-bold">
          ${product.price}
        </h4>

        {/* Edit Button */}
        <Link
          to={`/edit-product/${product.id}`}
          className="btn btn-warning mb-2"
        >
          Edit
        </Link>

        {/* Delete Button */}
        <button
          className="btn btn-danger mb-2"
          onClick={handleDelete}
        >
          Delete
        </button>

        {/* Add to Cart Button */}
        <button 
          className="btn btn-primary mt-auto"
          // Click Event
          onClick={() => 
            dispatch(addToCart(product))}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;

// This component is responsible for displaying one product in your store. 
// It receives a product from ProductList.tsx, displays its information, 
// and allows the user to add it to the shopping cart.
// The component has three main responsibilities:
// Display product information
// Handle missing product images
// Add products to the Redux shopping cart