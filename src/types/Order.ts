import type { Product } from "./Product";

export interface Order {
  id: string;
  userId: string;
  createdAt: {
    toDate(): Date;
  };
  totalPrice: number;
  products: (Product & {
    quantity: number;
  })[];
}