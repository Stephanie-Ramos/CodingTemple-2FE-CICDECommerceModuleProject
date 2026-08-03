// Imports the useQuery hook from React Query
// useQuery handles: Sending API requests, Loading states, Error handling, Caching data, 
// Refetching data when needed
import { useQuery } from "@tanstack/react-query";
// Imports your API function that retrieves categories
import { getCategories } from "../services/api";


// Props Type Definition
type CategorySelectProps = {
  // Defines a prop called selectedCategory: It stores the currently selected category
  selectedCategory: string;
  // Defines a function prop: This component will receive a function that accepts a string and returns nothing
  onCategoryChange: (category: string) => void;
};

// Component Function
// Creates the React component with two props
function CategorySelect({
  // Object Destructuring
  selectedCategory,
  onCategoryChange,
}: CategorySelectProps) {
  // Calls React Query
  const {
    data: categories,
    isLoading,
    error,
  // useQuery() returns an object containing information about the request
  // React Query Configuration
  // Creates the API query
  } = useQuery({
    // Creates a unique name for this query. React Query uses this key for caching data
    // instead of making another API request
    queryKey: ["categories"],
    // Defines the function that performs the API request.
    queryFn: getCategories,
  });

  // Loading State
  if (isLoading) {
    return <p>Loading categories...</p>;
  }

  // Error State
  // Ex. 404 Not Found
  if (error) {
    return <p>Error loading categories.</p>;
  }

  return (
    // Dropdown Element
    <select
      className="form-select mb-4"
      // Makes the dropdown a controlled component. The selected option is controlled by React state
      value={selectedCategory}
      // This runs when the user selects a category
      onChange={(e) => onCategoryChange(e.target.value)}
    >
      {/* Default Option */}
      <option value="">All Categories</option>

      {/* Display Categories */}
      {/* Optional chaining: The ?. means: Only run .map() if categories exists */}
      {categories?.map((category) => (
        // Option Key: React requires a unique key for lists to sets the actual value
        <option key={category} value={category}> 
          {/* Displays the text */}
          {category}
        </option>
      ))}
    </select>
  );
}

export default CategorySelect;

// Your CategorySelect component is actually a good example of a reusable 
// React component because it does not know anything about products or the 
// Home page. It only: gets categories, displays them, sends the user's s
// election back up