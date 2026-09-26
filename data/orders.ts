import type { Product } from "./products";
import { products } from "./products";

export type OrderStatus =
  | "placed"
  | "confirmed"
  | "preparing"
  | "out_for_delivery"
  | "delivered"
  | "cancelled";

export interface OrderItem {
  product: Product;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  status: OrderStatus;
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  address: string;
  placedAt: string;
  deliveredAt?: string;
  deliveryPartner?: {
    name: string;
    phone: string;
    rating: number;
    vehicleNo: string;
    photo: string;
    lat: number;
    lng: number;
  };
  otp: string;
  paymentMethod: "upi" | "card" | "wallet" | "cod";
  coupon?: string;
  vendor: string;
}

export const orders: Order[] = [
  {
    id: "ORD-8821",
    userId: "u1",
    items: [
      { product: products[7],  quantity: 1, price: 3499 },
      { product: products[31], quantity: 2, price: 90   },
      { product: products[30], quantity: 1, price: 380  },
    ],
    status: "delivered",
    subtotal: 4059,
    deliveryFee: 40,
    discount: 200,
    total: 3899,
    address: "B-204, Sector 21, Noida, UP 201301",
    placedAt: "2026-07-18T19:30:00Z",
    deliveredAt: "2026-07-18T20:02:00Z",
    otp: "7741",
    paymentMethod: "upi",
    vendor: "The Amber Room",
    deliveryPartner: {
      name: "Ravi Kumar",
      phone: "+91 98765 43210",
      rating: 4.8,
      vehicleNo: "DL 7C 3210",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200",
      lat: 28.5355,
      lng: 77.391,
    },
  },
  {
    id: "ORD-7644",
    userId: "u1",
    items: [
      { product: products[16], quantity: 1, price: 550 },
      { product: products[27], quantity: 1, price: 180 },
    ],
    status: "delivered",
    subtotal: 730,
    deliveryFee: 30,
    discount: 0,
    total: 760,
    address: "B-204, Sector 21, Noida, UP 201301",
    placedAt: "2026-07-17T21:15:00Z",
    deliveredAt: "2026-07-17T21:50:00Z",
    otp: "3318",
    paymentMethod: "cod",
    vendor: "Desi Daru Store",
  },
  {
    id: "ORD-6199",
    userId: "u1",
    items: [
      { product: products[3],  quantity: 2, price: 720 },
      { product: products[4],  quantity: 1, price: 560 },
      { product: products[32], quantity: 1, price: 180 },
    ],
    status: "out_for_delivery",
    subtotal: 2180,
    deliveryFee: 25,
    discount: 100,
    total: 2105,
    address: "B-204, Sector 21, Noida, UP 201301",
    placedAt: "2026-07-19T17:00:00Z",
    otp: "5590",
    paymentMethod: "card",
    vendor: "QuickSip Beer Mart",
    coupon: "BEER10",
    deliveryPartner: {
      name: "Suresh Yadav",
      phone: "+91 93456 12345",
      rating: 4.6,
      vehicleNo: "UP 16 AK 4521",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200",
      lat: 28.5280,
      lng: 77.3882,
    },
  },
];

export function getOrderById(id: string) {
  return orders.find((o) => o.id === id);
}

export function getOrdersByUserId(userId: string) {
  return orders.filter((o) => o.userId === userId);
}

export const statusLabels: Record<OrderStatus, string> = {
  placed: "Order Placed",
  confirmed: "Order Confirmed",
  preparing: "Being Prepared",
  out_for_delivery: "Out for Delivery",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

export const statusSteps: OrderStatus[] = [
  "placed",
  "confirmed",
  "preparing",
  "out_for_delivery",
  "delivered",
];
