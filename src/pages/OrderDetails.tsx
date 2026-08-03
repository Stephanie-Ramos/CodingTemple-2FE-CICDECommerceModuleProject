import { useEffect, useState } from "react";

// Import Firestore Service
import { getOrder } from "../firebase/orderService";
import type { Order } from "../types/Order";

// Import React Router
import { Link, useParams } from "react-router-dom";


// Create Component: OrderDetails
function OrderDetails() {
  // Read URL parameter
  const { id } = useParams();
  
  // Order state
  const [order, setOrder] = useState<Order | null>(null);
 

  // useEffect: Its job is to load the order from Firestore
  useEffect(() => {
    const loadOrder = async () => {
      // Check for ID: If no ID exists, the function stops immediately 
      if (!id) return;

      // Load order
      const data = await getOrder(id);

      // Save order: Stores the retrieved order in React state 
      setOrder(data);
    };

    // Execute helper
    loadOrder();
    // Dependency array: he effect runs: when the page first load and whenever the URL order ID changes
  }, [id]);

  // Loading screen: Checks whether the order has finished loading 
  // initially order === null
  if (!order) {
    // Displays: Loading...while Firestore retrieves the order.
    return <p className="container mt-4">Loading...</p>;
  }

  return (
    <div className="container mt-4">
      <h2 className="text-dark">Order Details</h2>

      <p>
        <strong>Order ID:</strong> {order.id}
      </p>

      <p>
        <strong>Date:</strong>{" "}
        {order.createdAt.toDate().toLocaleString()}
      </p>

      {/* Horizontal line */}
      <hr />

      {/* Loop through products */}
      {order.products.map((product) => (
        // Product container
        <div
          key={product.id}
          className="mb-4"
        >
          <h5>{product.title}</h5>

          <p>Price: ${product.price}</p>

          <p>Quantity: {product.quantity}</p>

          {/* Subtotal */}
          <p>
            Subtotal: $
            {(product.price * product.quantity).toFixed(2)}
          </p>

          {/* Horizontal line */}
          <hr />
        </div>
      ))}

      {/* Total */}
      <h4>
        Total: ${order.totalPrice.toFixed(2)}
      </h4>

      {/* Back to Order History button */}
      <Link
        to="/orders"
        className="btn btn-primary mt-3"
      >
        Back to Order History
      </Link>

    </div>
  );
}

export default OrderDetails;

// The OrderDetails page displays the complete information for a single 
// order placed by the currently logged-in user. When the page loads, it 
// retrieves the order ID from the URL using React Router's useParams() 
// Hook and calls the getOrder() function to fetch the matching order 
// from Firestore. While the data is loading, a loading message is displayed. 
// Once the order is retrieved, the page shows the order ID, purchase date, 
// each purchased product with its price, quantity, and subtotal, as well as 
// the overall order total. A Back to Order History button allows the user to 
// return to the Orders page using React Router without refreshing the 
// application. This component provides users with a detailed receipt of their 
// completed purchases while keeping the Firestore database logic separated in 
// the orderService file.