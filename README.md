# Advanced React E-Commerce Application with CI/CD

## Project Description

This project is a modern e-commerce web application built with **React**, **TypeScript**, **Firebase**, **Redux Toolkit**, and **React Query**. Users can browse products, register and log in with Firebase Authentication, manage a shopping cart, create orders, and view order details.

This project expands upon the previous Advanced React E-Commerce application by implementing **Test-Driven Development (TDD)**, **Continuous Integration (CI)**, and **Continuous Deployment (CD)** using **GitHub Actions** and **Vercel**. Every push to the `main` branch automatically runs the test suite, builds the application, and deploys a new production version after all checks pass successfully. This follows the recommended GitHub Actions and Vercel deployment workflow.

---

## Live Vercel Application

https://cicd-ecommerce.vercel.app/

---

## GitHub Repository

https://github.com/Stephanie-Ramos/CodingTemple-2FE-CICDECommerceModuleProject

---

## Features

### Product Management

- Display products stored in Firebase Firestore
- Filter products by category
- Add new products
- Edit existing products
- Delete products

### User Authentication

- Register new users
- Login and logout with Firebase Authentication
- Update user profile
- Delete user account

### Shopping Cart

- Add products to cart
- Remove products
- Update product quantities
- Persist cart using sessionStorage
- Automatically calculate total items and total price

### Order Management

- Checkout products
- Save completed orders to Firebase Firestore
- View Order Details page

---

# Technologies Used

- React 19
- TypeScript
- Vite
- React Router
- Redux Toolkit
- React Redux
- React Query
- Firebase Authentication
- Firebase Firestore
- Bootstrap 5
- Jest
- React Testing Library
- GitHub Actions
- Vercel

---

# Installation Instructions

Clone the repository:

```bash
git clone https://github.com/Stephanie-Ramos/CodingTemple-2FE-CICDECommerceModuleProject.git
```

Navigate into the project:

```bash
cd cicd-ecommerce
```

Install project dependencies:

```bash
npm install
```

Create a `.env` file in the project root and add your Firebase configuration:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

Start the development server:

```bash
npm run dev
```

---

# Testing Instructions

This project follows a **Test-Driven Development (TDD)** workflow using **Jest** and **React Testing Library**.

### Unit Tests

The application includes unit tests for multiple components:

- **ProductCard**
  - Renders product information correctly.
  - Adds a product to the Redux cart when the **Add to Cart** button is clicked.

- **Register**
  - Renders the registration form.
  - Updates email and password inputs.
  - Successfully registers a user and redirects to the Home page.

### Integration Test

The project includes an integration test that verifies interaction between **ProductCard** and **ShoppingCart**.

The test confirms that:

- The cart initially displays an empty state.
- Clicking **Add to Cart** updates the Redux store.
- ShoppingCart automatically re-renders.
- Total Items updates correctly.
- Total Price updates correctly.

Run all tests with:

```bash
npm test
```

---

# Continuous Integration (CI)

Continuous Integration is implemented using **GitHub Actions**.

Every push or pull request to the `main` branch automatically:

- Installs project dependencies
- Runs the complete Jest test suite
- Builds the production application
- Stops the workflow if any test or build fails

The workflow is located at:

```text
.github/workflows/main.yml
```

---

# Continuous Deployment (CD)

Continuous Deployment is implemented using **GitHub Actions** together with **Vercel**.

After the **Test and Build** job completes successfully, GitHub Actions automatically:

- Installs the Vercel CLI
- Retrieves the Vercel project configuration
- Builds the production application
- Deploys the application to Vercel

Deployment is authenticated using GitHub repository secrets:

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

Firebase configuration is provided through Vercel Environment Variables, keeping sensitive credentials out of the source code. This deployment approach follows Vercel's recommended GitHub Actions workflow using `vercel pull`, `vercel build`, and `vercel deploy --prebuilt`.

---

# Project Structure

```text
src/
├── components/
├── firebase/
├── pages/
├── redux/
├── services/
├── test/
├── types/
├── utils/

.github/
└── workflows/
    └── main.yml
```

---

# Learning Objectives

This project demonstrates:

- React component architecture
- TypeScript development
- Firebase Authentication
- Firestore CRUD operations
- Redux Toolkit state management
- React Query
- Protected routing
- Unit Testing with Jest
- Integration Testing with React Testing Library
- Continuous Integration with GitHub Actions
- Continuous Deployment with Vercel

---
