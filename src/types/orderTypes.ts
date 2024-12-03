// types.ts
export interface OrderItem {
  perfumeId: string;
  volume: number;
  quantity: number;
  price: number;
  totalPrice: number;
}

export interface Order {
  orderId: string;
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  appliedCampaigns: any[];
  status: "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED";
  createdAt: string;
}
