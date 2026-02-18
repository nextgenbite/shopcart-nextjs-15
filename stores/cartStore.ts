import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "@/lib/api"; // your axios instance from the auth example
import {Cart, CartItem } from "@/types/active_ecommerce_json";

// Types based on your Laravel API response



interface CartState {
  cart: Cart | null;
  isLoading: boolean;
  error: string | null;
  fetchCart: () => Promise<void>;
  addToCart: (productId: number, quantity?: number) => Promise<void>;
  updateCartItem: (cartItemId: number, quantity: number) => Promise<void>;
  removeFromCart: (cartItemId: number) => Promise<void>;
  clearCart: () => Promise<void>;
  clearError: () => void;
  getItemCount: (productId: number) => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  cart: null,
  isLoading: false,
  error: null,

  fetchCart: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get("/cart");
      set({
        cart:{ items: response?.data?.data.items, total: response?.data?.data.total, item_count:  response?.data?.data.items.reduce(
            (sum: number, item: CartItem) => sum + item.quantity,
            0,
          ) || 0 },
       
        isLoading: false,
      });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Failed to fetch cart",
        isLoading: false,
      });
    }
  },

  addToCart: async (productId, quantity = 1) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post("/cart/add", {
        product_id: productId,
        quantity,
      });
      // After adding, update the cart with the new data from server
          set({
        cart:{ items: response?.data?.data.items, total: response?.data?.data.total, item_count:  response?.data?.data.items.reduce(
            (sum: number, item: CartItem) => sum + item.quantity,
            0,
          ) || 0 },
       
        isLoading: false,
      });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Failed to add item to cart",
        isLoading: false,
      });
    }
  },

  updateCartItem: async (cartItemId, quantity) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.put(`/cart/update/${cartItemId}`, {
        quantity,
      });
      set({ cart: response.data.cart, isLoading: false });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Failed to update cart item",
        isLoading: false,
      });
    }
  },

  removeFromCart: async (productId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post(`/cart/remove`,{
        product_id: productId,
      });
      set({ cart:{ items: response?.data?.data.items, total: response?.data?.data.total, item_count:  response?.data?.data.items.reduce(
            (sum: number, item: CartItem) => sum + item.quantity,
            0,
          ) || 0 }, isLoading: false });
    } catch (error: any) {
      set({
        error:
          error.response?.data?.message || "Failed to remove item from cart",
        isLoading: false,
      });
    }
  },

  clearCart: async () => {
    set({ isLoading: true, error: null });
    try {
      await api.post("/cart/clear");
      set({ cart: { items: [], total: 0, item_count: 0 }, isLoading: false });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Failed to clear cart",
        isLoading: false,
      });
    }
  },
      getItemCount: (productId) => {
        const item = get().cart?.items.find((item) => Number(item.product.id) === Number(productId));
        return item ? item.quantity : 0;
      },
  clearError: () => set({ error: null }),
}));
