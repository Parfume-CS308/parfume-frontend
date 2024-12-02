import axios from "axios";
import { Order } from "@/types/orderTypes"; // Adjust the import path as needed

interface OrdersResponse {
  message: string;
  items: Order[];
}

export const getOrdersRequest = () => axios.get<OrdersResponse>("/orders");
