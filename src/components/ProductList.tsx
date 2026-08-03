import { useQuery } from "@tanstack/react-query";
import ProductCard from "./ProductCard";

import { getProducts, getProductsByCategory } from "../services/api";


// Props Type
type ProductListProps = {
  // The component expects one prop named:
  selectedCategory: string;
};


// Component
function ProductList({
  // from the parent (Home.tsx)
  selectedCategory,
}: ProductListProps) {
  // React Query: useQuery() returns several pieces of information
  const {
    data: products,
    isLoading,
    error,
  // Starts the React Query request
  } = useQuery({
    // When the category changes, so does the queryKey
    queryKey: ["products", selectedCategory],
    // If no category is selected, fetch all products. Otherwise, fetch only the selected category
    queryFn: () =>
      selectedCategory
        ? getProductsByCategory(selectedCategory)
        : getProducts(),
  });

  // Loading State
  if (isLoading) {
    return <h2>Loading products...</h2>;
  }

  // Error State
  if (error) {
    return <h2>Error loading products.</h2>;
  }

  return (
    // Bootstrap Grid
    <div className="row g-4">
      {/* Loop Through Products */}
      {products?.map((product) => (
        // Product Container
        <div key={product.id} className="col-sm-6 col-md-4 col-lg-3">
          {/* Render ProductCard: This creates one ProductCard component for the current product */}
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}

export default ProductList;