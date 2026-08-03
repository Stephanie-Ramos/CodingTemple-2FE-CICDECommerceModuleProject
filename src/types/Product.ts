export interface Product {
  // Firestore uses a document ID instead of the FakeStore numeric ID
  id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}
