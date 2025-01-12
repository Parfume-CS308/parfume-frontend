// types.ts
export interface OrderItem {
  perfumeId: string;
  perfumeName: string;
  volume: number;
  quantity: number;
  price: number;
  totalAmount: number;
  discountedPrice: number;
  basePrice: number;
}

export interface Order {
  orderId: string;
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  appliedCampaigns: any[];
  status: OrderStatus;
  createdAt: string;
  discountAmount: number;
  taxId: string;
  cardLastFourDigits: string;
}

export interface AdminOrder extends Order {
  userName: string;
  shippingAddress: string;
  campaignDiscountAmount: number;
  invoiceNumber: string;
  invoiceUrl: string;
}

export type MakeOrderRequest = {
  shippingAddress: string;
  taxId: string;
  campaignIds: string[];
  paymentId: string;
  cardNumber: string;
  cardHolder: string;
  expiryDateMM: string;
  expiryDateYY: string;
  cvv: string;
};

export enum OrderStatus {
  PROCESSING = "processing",
  DELIVERED = "delivered",
  CANCELLED = "canceled",
  SHIPPED = "in-transit",
}
