// Reusable TypeScript interfaces and small fetch helpers for DummyJSON

import { notFound } from "next/navigation";

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: {
    address: string;
    city: string;
    postalCode: string;
    state: string;
    country: string;
  };
  avatar: string;
}
export interface Address {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
}

export interface Category {
  id: string;
  title: string;
  slug: string;
}
export interface Brand {
  id: string;
  title: string;
  slug: string;
}

export interface Product {
  id: number;
  title: string;
  slug: string;
  description: string;
  price: number;
  discountPercentage?: number;
  discount?: number;
  rating: number;
  reviews?: any[];
  stock: number;
  brand?: string;
  category?: Category[];
  thumbnail: string;
  images?: string[];
}

export interface ProductListResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface CartItem {
  id: number;
  cart_id: number;
  product_id: number;
  product: Product;
  title: string;
  price: number;
  quantity: number;
  total: number;

  discountPercentage: number;
  discountedPrice: number;
}

export interface Cart {
  // id: number;
  items: CartItem[];
  item_count: number;
  // discount: number;
  // user_id: number;
  subtotal: number;
  // shipping_cost: number;
  // tax: number;
  total: number;
}

// export type Categories = Category[];

// --- Small typed fetch helpers (can be used in server components / API routes) ---

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL + "/api";

export async function fetchProducts(params?: {
  limit?: number;
  skip?: number;
}): Promise<ProductListResponse> {
  const qs = new URLSearchParams();
  if (params?.limit) qs.set("limit", String(params.limit));
  if (params?.skip) qs.set("skip", String(params.skip));
  const url = `${BASE_URL}/products${qs.toString() ? `?${qs.toString()}` : ""}`;
  const res = await fetch(url);
  const data = await res.json();
  console.log("fetchProducts response:", data);
  if (!res.ok) throw new Error(`fetchProducts failed: ${res.status}`);
  return data;
}

export async function fetchProductById(id: number): Promise<Product> {
  const res = await fetch(`${BASE_URL}/products/${id}`);
  if (!res.ok) throw new Error(`fetchProductById failed: ${res.status}`);
  return res.json();
}

export async function fetchProductBySlug(slug: string): Promise<Product> {
  const res = await fetch(`${BASE_URL}/public/details/${slug}`, {
    next: { revalidate: 60 }, // SSR with caching
  });
  if (res.status === 404) notFound();
  if (!res.ok) throw new Error(`fetchProductBySlug failed: ${res.status}`);
  const data = await res.json();
  return data.data;
}

export async function fetchCarts(): Promise<{
  carts: Cart[];
  total: number;
  skip: number;
  limit: number;
}> {
  const res = await fetch(`${BASE_URL}/carts`);
  if (!res.ok) throw new Error(`fetchCarts failed: ${res.status}`);
  return res.json();
}

export async function fetchCartById(id: number): Promise<Cart> {
  const res = await fetch(`${BASE_URL}/carts/${id}`);
  if (!res.ok) throw new Error(`fetchCartById failed: ${res.status}`);
  return res.json();
}

export async function fetchCategories(): Promise<Category[]> {
  const res = await fetch(`${BASE_URL}/public/categories`, {
    // SSR with 60s caching
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error(`fetchCategories failed: ${res.status}`);
  const data = await res.json();
  return data; // assuming paginated response
}
export async function fetchBrands(): Promise<Brand[]> {
  const res = await fetch(`${BASE_URL}/public/brands`, {
    // SSR with 60s caching
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error(`fetchCategories failed: ${res.status}`);
  const data = await res.json();
  console.log("fetchCategories response:", data);
  return data; // assuming paginated response
}

export async function getProductsByQuery(params: {
  category?: string;
  brand?: string;
  sort?: string;
}): Promise<ProductListResponse> {
  const qs = new URLSearchParams();
  if (params.category) qs.set("category", String(params.category));
  if (params.brand) qs.set("brand", String(params.brand));
  if (params.sort) qs.set("sort", params.sort);
  const res = await fetch(`${BASE_URL}/public/products?${qs.toString()}`, {
    // SSR with 60s caching
    next: { revalidate: 60 },
  });
  console.log("getProductsByQuery response:", res);
  if (!res.ok) throw new Error(`fetchProducts failed: ${res.status}`);
  const data = await res.json();
  return data; // assuming paginated response
}
