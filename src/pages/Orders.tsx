import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getOrders } from "../firebase/orderService";
import type { Order } from "../types/Order";

// Create Component: Orders 
function Orders() {
  // Create Orders State
  // Order[]: This tells TypeScript that orders will always contain an array of Order objects
  // setOrders: Updates the orders after they are retrieved from Firestore
  const [orders, setOrders] = useState<Order[]>([]);
  
  // Its purpose is to retrieve the user's order history 
  useEffect(() => {
    // Create Helper Function
    const loadOrders = async () => {
      // Retrieve Orders
      const data = await getOrders();
      
      // Save Orders
      setOrders(data);
    };

    loadOrders();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-dark">Order History</h2>

      {/* Conditional Rendering */}
      {orders.length === 0 ? (
        <p>No previous orders.</p>
      // Otherwise
      ) : (
        // Loop Through Orders
        orders.map((order) => (
          // Order Card
          <div
            key={order.id}
            className="card mb-3 p-3"
          >
            {/* Display Order ID */}
            <p>
              <strong>Order ID:</strong> {order.id}
            </p>

            {/* Display Date */}
            <p>
              <strong>Date:</strong>{" "}
              {order.createdAt
                ?.toDate()
                .toLocaleString()}
            </p>

            {/* Display Total */}
            <p>
              <strong>Total:</strong> $
              {order.totalPrice.toFixed(2)}
            </p>

            {/* View Order Button */}
            <Link
              className="btn btn-primary"
              to={`/orders/${order.id}`}
            >
              View Order
            </Link>
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;

// The Orders component serves as the Order History page for your application. 
// When the page loads, it calls the getOrders() function to retrieve all orders 
// belonging to the currently logged-in user from Firestore. The orders are stored 
// in React state and displayed as Bootstrap cards showing the order ID, purchase 
// date, and total price. If the user has no previous orders, a message is 
// displayed instead. Each order also includes a View Order button that uses React 
// Router to navigate to the corresponding OrderDetails page, where the complete 
// order information can be viewed.