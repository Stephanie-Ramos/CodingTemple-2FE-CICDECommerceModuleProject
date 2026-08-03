// useState lets a component remember information while the application is running
import { useState } from "react";
// Import Components
import CategorySelect from "../components/CategorySelect";
import ProductList from "../components/ProductList";


// Home Component: Creates the Home page component
function Home() {
  // selectedCategory: This variable stores the current category
  // setSelectedCategory: This is the function that changes the category
  // useState(""): Creates the state
  const [selectedCategory, setSelectedCategory] = useState("");

  return (
    // Bootstrap Container
    <div className="container mt-5">
      <h1 className="display-4 fw-bold text-center mb-4 text-dark">
        FakeStore Products
      </h1>

      <p className="text-center text-muted mb-5">
        Browse products and add them to your shopping cart.
      </p>

      {/* CategorySelect Component */}
      {/* selectedCategory={selectedCategory}: Passes the current category to the child component. */}
      {/* onCategoryChange={setSelectedCategory}: hat means when the dropdown changes, the child component can update the Home component's state  */}
      <CategorySelect
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {/* ProductList Component: Displays every product */}
      {/* selectedCategory={selectedCategory}: Passes the currently selected category into ProductList */}
      <ProductList selectedCategory={selectedCategory} />
    </div>
  );
}

export default Home;

// The Home component acts as the "middleman" between the category 
// dropdown and the product list.