import axios from "axios";
import { CartResponse, SyncCartRequest } from "../types/cart";

export const getCartRequest = () => axios.get<CartResponse>("/cart");

export const syncCartRequest = (data: SyncCartRequest) =>
  axios.post<CartResponse>("/cart/sync", data);
