# Firebase E-Commerce Application

## Overview

This project is a React + TypeScript e-commerce application built as part of the Coding Temple Front-End Engineering curriculum. The application began as an advanced e-commerce app that consumed data from the FakeStore API. It was later migrated to Firebase, replacing the external API with Firestore and Firebase Authentication while preserving the original shopping experience.

The application allows users to register, log in, manage their profile, browse products stored in Firestore, manage a shopping cart, place orders, and review their order history.

---

## Learning Objectives

This project demonstrates how to:

- Integrate Firebase Authentication into a React application
- Store and retrieve data using Cloud Firestore
- Perform full CRUD operations with Firestore
- Manage application state using Redux Toolkit
- Fetch asynchronous data with React Query
- Navigate between pages using React Router
- Build responsive layouts with Bootstrap
- Store shopping cart data using Session Storage
- Organize a scalable React application using reusable components and services

---

# Technologies Used

- React
- TypeScript
- Vite
- Firebase Authentication
- Cloud Firestore
- React Router DOM
- Redux Toolkit
- React Redux
- React Query (TanStack Query)
- Axios
- Bootstrap 5

---

# Features

## Authentication

Users can:

- Register using email and password
- Log into an existing account
- Log out securely
- Authenticate with Firebase Authentication

During registration:

- A Firebase Authentication account is created.
- A corresponding user document is created in the Firestore `users` collection.

---

## User Profile Management

Each authenticated user has a profile stored in Firestore.

Users can:

- View their profile
- Update profile information
  - Name
  - Address
- Delete their profile
- Delete their Firebase Authentication account

---

## Product Management

Unlike the previous version that consumed the FakeStore API, this application stores products inside Cloud Firestore.

Features include:

- View all products
- Filter products by category
- Add new products
- Edit existing products
- Delete products

Products are stored in the Firestore `products` collection.

---

## Shopping Cart

Redux Toolkit manages the shopping cart.

Users can:

- Add products to the cart
- Remove products
- Increase quantity
- Decrease quantity
- View total items
- View total price

The cart is persisted using Session Storage.

---

## Order Management

When users complete checkout:

- The order is stored in Firestore.
- The shopping cart is cleared.
- Users are redirected directly to the newly created Order Details page.

Each order stores:

- User ID
- Order creation date
- Products
- Quantities
- Total price

Orders are stored in the Firestore `orders` collection.

---

## Order History

Authenticated users can:

- View all previous orders
- Open individual order details
- View:
  - Products purchased
  - Quantity
  - Price
  - Order date
  - Total cost

---

## Responsive Navigation

The application includes a responsive Bootstrap navigation bar.

Desktop navigation displays:

- Home
- Cart
- Add Product
- Orders
- Profile
- Register
- Login
- Logout

On smaller devices:

- Navigation collapses into a Bootstrap hamburger menu.

Navigation automatically updates depending on whether the user is logged in.

---

# Firebase Collections

The application uses three Firestore collections.

## users

Stores profile information.

Example:

```text
users
 └── uid
      ├── email
      ├── name
      ├── address
      └── createdAt
```

---

## products

Stores product catalog.

Example:

```text
products
 └── productId
      ├── title
      ├── description
      ├── category
      ├── image
      └── price
```

---

## orders

Stores completed purchases.

Example:

```text
orders
 └── orderId
      ├── userId
      ├── createdAt
      ├── totalPrice
      └── products[]
```

---

# Project Structure

```text
src
│
├── components
│   ├── CategorySelect.tsx
│   ├── Navbar.tsx
│   ├── ProductCard.tsx
│   ├── ProductForm.tsx
│   ├── ProductList.tsx
│   └── ShoppingCart.tsx
│
├── firebase
│   ├── authService.ts
│   ├── firebase.ts
│   ├── orderService.ts
│   ├── productService.ts
│   └── userService.ts
│
├── pages
│   ├── AddProduct.tsx
│   ├── Cart.tsx
│   ├── EditProduct.tsx
│   ├── Home.tsx
│   ├── Login.tsx
│   ├── Orders.tsx
│   ├── OrderDetails.tsx
│   ├── Profile.tsx
│   └── Register.tsx
│
├── redux
│
├── types
│
└── utils
```

---

# Running the Project

## Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
```

---

## Install dependencies

```bash
npm install
```

---

## Start the development server

```bash
npm run dev
```

---

# Firebase Configuration

Create a Firebase project and enable:

- Firebase Authentication
- Cloud Firestore

Update your Firebase configuration inside:

```text
src/firebase/firebase.ts
```

---

# Migrating from the FakeStore API

This project originally consumed product data from:

- FakeStore API

The application was migrated to Firebase by:

- Importing the original FakeStore products into Firestore
- Replacing all API calls with Firestore queries
- Replacing authentication with Firebase Authentication
- Replacing product CRUD operations with Firestore CRUD operations
- Creating Firestore collections for users, products, and orders
- Implementing persistent user profiles
- Implementing order history stored in Firestore

---

# Future Improvements

Potential enhancements include:

- Product image uploads using Firebase Storage
- Product search
- Product sorting
- Wishlist/Favorites
- Admin dashboard
- Protected admin routes
- Pagination
- Product reviews
- User avatars
- Stripe payment integration
- Dark mode

---

