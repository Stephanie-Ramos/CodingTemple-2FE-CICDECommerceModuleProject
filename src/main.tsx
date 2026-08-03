// Imports React so the developer can write JSX
import React from "react";
// This mounts your React application into the index.html file
import ReactDOM from "react-dom/client";
// Import React Query
// QueryClient: creates the object that manages all your API requests and cache
// QueryClientProvider: makes that client available to every component in your app
// import "./importProducts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// The Provider gives every component access to the Redux store.
import { Provider } from "react-redux";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./index.css";

import App from "./App";
import { store } from "./redux/store";

// Create a React Query client
const queryClient = new QueryClient();

// Render the application
// This tells React where to display your application.
ReactDOM.createRoot(document.getElementById("root")!).render(
  // Developer tool which helps identify potential issues
  <React.StrictMode>
    {/* Makes the Redux store available throughout the application */}
    <Provider store={store}>
      {/* Makes the React Query client available to all components */}
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
