// This imports three tools from React Testing Library
// render() places a React component into Jest’s simulated browser environment
// screen provides query methods for finding elements rendered on the page
// waitFor() waits for an asynchronous result to occur
import { render, screen, waitFor } from "@testing-library/react";
// This imports userEvent, which simulates realistic user actions: type, click, and clear
import userEvent from "@testing-library/user-event";
// MemoryRouter provides routing support during tests without changing the actual browser URL
import { MemoryRouter } from "react-router-dom";

import Register from "./Register";
import { registerUser } from "../firebase/authService";

// Mocking Firebase registration: Replace the real Firebase authentication service with a mock
// jest.mock() replaces the real module with a fake version during testing 
// ../firebase/authService: The first argument, identifies the module being replaced
// () => ({ ... }): The second argument is a function tht returns the fake module
// registerUser: jest.fn(): This replaces the real registerUser function with a Jest mock function
jest.mock("../firebase/authService", () => ({
  registerUser: jest.fn(),
}));

// Mocking navigation: Create a mock function that records navigation calls
const mockNavigate = jest.fn();

// Use the real React Router module, but replace useNavigate
jest.mock("react-router-dom", () => ({
  // ...: copies all of the real module’s exports into the mock object.
 // jest.requireActual() loads the real React Router module   
  ...jest.requireActual("react-router-dom"),
 // This replaces only useNavigate
  useNavigate: () => mockNavigate,
}));

// Create a typed mock: Create a properly typed Jest version of registerUser
// This creates a properly typed Jest version of registerUser
// jest.mocked(): Treat this imported function as a Jest mock while preserving its original parameter and return types,
// so the function accepts an email and password, returns a Firebase user through a Promise, and supports Jest mock methods
const mockedRegisterUser = jest.mocked(registerUser);

// Test group 
// describe(): groups related tests together
// Register component: appears in the terminal when Jest runs
describe("Register component", () => {
  // Setup before every test   
  // beforeEach(): runs before every test inside this describe() block. This setup runs three times, since there are three tests 
  beforeEach(() => {
    // Clear calls and results left over from previous tests from Jest mocks
    // clearAllMocks(): resets call history so each test remains independent
    jest.clearAllMocks();

    // Prevent Jest from opening a real browser alert. 
    // jest.spyOn(): watches or temporarily replaces an existing method
    jest
      // In the Jest browser simulation, alerts should not actually open
      .spyOn(window, "alert")
      // This replaces window.alert with an empty function
      .mockImplementation(() => {});

    // Simulate a successful Firebase registration.
    // Your real function is asynchronous, so the mock must also behave like an asynchronous function
    mockedRegisterUser.mockResolvedValue(
      // This creates a placeholder object with the same resolved type as the real registerUser function
      // Tells TypeScript to treat the empty object as a Firebase User
      // typeof registerUser: gets the type of the registerUser function
      //  ReturnType<typeof registerUser>: gets its return type.
      {} as Awaited<ReturnType<typeof registerUser>>
    );
  });
  
  // Cleanup after every test 
  // afterEach(): runs after every test in this group
  afterEach(() => {
    // Restore browser functions such as window.alert. This prevents the mocked alert from affecting other test files
    jest.restoreAllMocks();
  });

  // First test: rending: component renders correctly 
  // The test verifies that the registration page displays the expected elements  
  test("renders the registration form", () => {
    render(
      // Register is wrapped in MemoryRouter because the component uses React Router’s useNavigate()
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    // expect() begins an assertion. An assertion checks whether the actual result matches the expected result
    expect(
      // This searches the rendered page for a heading with the accessible name Register
      screen.getByRole("heading", {
        name: "Register",
      })
    // ).toBeInTheDocument(): This verifies that the heading exists in the rendered document
    ).toBeInTheDocument();

    // Verifies that the input Email appears on the page.
    expect(
      screen.getByPlaceholderText("Email")
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText("Password")
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: "Register",
      })
    ).toBeInTheDocument();
  });

  // Second test: state changes: types changes to the component's state
  // This test checks whether typing updates the component’s state
  // It is marked async because userEvent actions return Promises
  test("updates the email and password inputs", async () => {
    // This creates a user interaction controller: type, click and clear
    const user = userEvent.setup();

    // React Testing Library cleans up after each test, so this component starts with empty inputs 
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    // This finds the email input and saves it in the emailInput variable
    const emailInput =
      screen.getByPlaceholderText("Email");

    const passwordInput =
      screen.getByPlaceholderText("Password");

    // This simulates a user typing into the email input
    await user.type(
      emailInput,
      "stephanie@example.com"
    );

    await user.type(
      passwordInput,
      "Password123"
    );

    // This verifies that the email input now contains the typed email address
    expect(emailInput).toHaveValue(
      "stephanie@example.com"
    );

    expect(passwordInput).toHaveValue(
      "Password123"
    );
  });

  // Third test: submission and navigation: calls Firebase, shows succcess, and navigates home
  // This test verifies the complete successful submission flow: Type an email. Type a password. Click Register. 
  // Call registerUser. Show a success alert. Navigate home. 
  test("registers the user and navigates home", async () => {
    // This creates a fresh user interaction controller
    const user = userEvent.setup();

    // This renders a new instance of the registration component
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    // This finds the email field and types the email address into it
    await user.type(
      screen.getByPlaceholderText("Email"),
      "stephanie@example.com"
    );

    await user.type(
      screen.getByPlaceholderText("Password"),
      "Password123"
    );

    // This clicks the Register button 
    // Because the button is inside a form, clicking it submits the form
    await user.click(
      screen.getByRole("button", {
        name: "Register",
      })
    );

    // waitFor(): waits until the assertion inside it passes.
    await waitFor(() => {
      expect(mockedRegisterUser).toHaveBeenCalledWith(
        // This verifies that the mocked Firebase function received exactly two arguments 
        "stephanie@example.com",
        "Password123"
      );
    });

    // This verifies that registerUser() was called exactly once 
    // It protects against accidental duplicate form submissions
    expect(mockedRegisterUser).toHaveBeenCalledTimes(1);

    // This confirms that the component displayed the correct success message 
    expect(window.alert).toHaveBeenCalledWith(
      "Registration successful!"
    );

    // This verifies that the component attempted to navigate to the home route 
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});
