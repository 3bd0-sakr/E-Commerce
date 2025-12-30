import { ProductI } from "./product";



export interface Order {
  _id: string;
  id: number;

  createdAt: string;
  updatedAt: string;
  paidAt?: string;

  totalOrderPrice: number;
  taxPrice: number;
  shippingPrice: number;
  
  paymentMethodType: "card" | "cash";
  isPaid: boolean;
  isDelivered: boolean;

  shippingAddress?: ShippingAddress;
  user: User;

  cartItems: OrderItem[];
}

export interface OrderItem {
  _id: string;
  count: number;
  price: number;
  product: ProductI;
}

export interface ShippingAddress {
  details: string;
  city: string;
  phone: string;
}

export interface User {
  _id: string
  name: string
  email: string
  phone: string
}