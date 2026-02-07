// Reusable TypeScript interfaces and small fetch helpers for DummyJSON

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  discount?: number;
  rating: number;
  reviews?: any[];
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface ProductListResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface CartProduct {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  discountPercentage: number;
  discountedPrice: number;
}

export interface Cart {
  id: number;
  products: CartProduct[];
  total: number;
  discountedTotal: number;
  userId: number;
  totalProducts: number;
  totalQuantity: number;
}

export type Category = string;
export type Categories = string[];

// --- Small typed fetch helpers (can be used in server components / API routes) ---

const DUMMYJSON_BASE = "https://dummyjson.com";

export async function fetchProducts(params?: { limit?: number; skip?: number }): Promise<ProductListResponse> {
  const qs = new URLSearchParams();
  if (params?.limit) qs.set("limit", String(params.limit));
  if (params?.skip) qs.set("skip", String(params.skip));
  const url = `${DUMMYJSON_BASE}/products${qs.toString() ? `?${qs.toString()}` : ""}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`fetchProducts failed: ${res.status}`);
  return res.json();
}

export async function fetchProductById(id: number): Promise<Product> {
  const res = await fetch(`${DUMMYJSON_BASE}/products/${id}`);
  if (!res.ok) throw new Error(`fetchProductById failed: ${res.status}`);
  return res.json();
}

export async function fetchCarts(): Promise<{ carts: Cart[]; total: number; skip: number; limit: number }> {
  const res = await fetch(`${DUMMYJSON_BASE}/carts`);
  if (!res.ok) throw new Error(`fetchCarts failed: ${res.status}`);
  return res.json();
}

export async function fetchCartById(id: number): Promise<Cart> {
  const res = await fetch(`${DUMMYJSON_BASE}/carts/${id}`);
  if (!res.ok) throw new Error(`fetchCartById failed: ${res.status}`);
  return res.json();
}

export async function fetchCategories(): Promise<Categories> {
  const res = await fetch(`${DUMMYJSON_BASE}/products/categories`);
  if (!res.ok) throw new Error(`fetchCategories failed: ${res.status}`);
  return res.json();
}
