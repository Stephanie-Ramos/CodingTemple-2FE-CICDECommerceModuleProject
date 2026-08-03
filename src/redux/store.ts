// Redux Toolkit provides configureStore(), which creates the Redux store with sensible defaults
import { configureStore } from "@reduxjs/toolkit";
// This imports the reducer that will manage the shopping cart.
import cartReducer from "./cartSlice";

// This creates the global Redux store.
export const store = configureStore({
    // Register reducers: The cart state will be managed by cartReducer
    reducer: {
        cart: cartReducer,
  },
});

// Export TypeScript types
// These types help TypeScript understand your Redux store
// This type describes your entire Redux state
export type RootState = ReturnType<typeof store.getState>;
// This type describes your Redux dispatch() function
export type AppDispatch = typeof store.dispatch;