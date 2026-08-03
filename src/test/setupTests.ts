// This imports Jest DOM, an extension to Jest that adds additional assertions (called matchers) 
// specifically for testing HTML elements
import "@testing-library/jest-dom";
// These are classes provided by Node.js
// TextEncoder converts: Text into bytes
// TextDecoder converts those bytes back into readable text
import {
  TextDecoder,
  TextEncoder,
} from "util";

// Object.defineProperty()?: This JavaScript method creates or changes a property on an object
// globalThis: is the global object
Object.defineProperty(globalThis, "TextEncoder", {
  // This means the property can be changed later if needed 
  writable: true,
  // This assigns the imported TextEncoder class from Node.js to the global object
  value: TextEncoder,
});

Object.defineProperty(globalThis, "TextDecoder", {
  writable: true,
  value: TextDecoder,
});
