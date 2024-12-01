export interface CartItem {
  perfumeId: string;
  perfumeName: string;
  brand: string;
  volume: number;
  quantity: number;
  basePrice: number;
}

export interface Cart {
  id: string;
  items: CartItem[];
  totalPrice: number;
}

export interface CartResponse {
  message: string;
  cart: Cart;
}

export interface SyncCartItem {
  perfume: string; // perfumeId
  volume: number;
  quantity: number;
}

export interface SyncCartRequest {
  items: SyncCartItem[];
}
