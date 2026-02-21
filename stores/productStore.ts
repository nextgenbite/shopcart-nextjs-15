import { create } from "zustand";
import api from "@/lib/api";
import { Product } from "@/types/active_ecommerce_json";



interface ProductFilters {
  search?: string;
  category?: string;
  min_price?: number;
  max_price?: number;
  sort?: "price_asc" | "price_desc" | "newest";
  page?: number;
}

interface ProductState {
  // For both infinite scroll and filtered views
  products: Product[];
  currentProduct: Product | null;
  totalPages: number;
  currentPage: number;
  isLoading: boolean;
  isLoadingMore: boolean; // separate flag for infinite scroll
  error: string | null;
  filters: ProductFilters;
  hasMore: boolean;

  // Core actions
  setProducts: (products: Product[]) => void;
  setCurrentProduct: (product: Product | null) => void;
  fetchProducts: (filters?: ProductFilters, append?: boolean) => Promise<void>;
  fetchProductBySlug: (slug: string) => Promise<void>;
  setFilters: (filters: Partial<ProductFilters>) => void;
  clearFilters: () => void;
  clearError: () => void;
  resetProducts: () => void; // clear product list (e.g., on filter change)
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  currentProduct: null,
  totalPages: 1,
  currentPage: 1,
  isLoading: false,
  isLoadingMore: false,
  error: null,
  filters: {},
  hasMore: false,

  setProducts: (products) => set({ products }),
  setCurrentProduct: (currentProduct) => set({ currentProduct }),

  fetchProducts: async (filters = {}, append = false) => {
    // If appending, we're loading more; otherwise we're doing a fresh load
    if (append) {
      set({ isLoadingMore: true });
    } else {
      set({ isLoading: true, error: null });
    }

    try {
      // Merge existing filters with new ones (for page, we'll handle separately)
      const currentFilters = get().filters;
      // If append is true, we keep the same filters but increment page internally
      // The page param should come from the filters argument if provided
      const mergedFilters = { ...currentFilters, ...filters };

      // Build query string
      const params = new URLSearchParams();
      Object.entries(mergedFilters).forEach(([key, value]) => {
        if (value !== undefined && value !== "") {
          params.append(key, String(value));
        }
      });

      const response = await api.get(`/products?${params.toString()}`);

      // Assuming API returns paginated data: { data: Product[], current_page, last_page }
      const newProducts = response.data.data || [];
      const totalPages = response.data.last_page || 1;
      const currentPage = response.data.current_page || 1;

      set((state) => ({
        products: append ? [...state.products, ...newProducts] : newProducts,
        totalPages,
        currentPage,
        hasMore: currentPage < totalPages,
        filters: mergedFilters,
        isLoading: false,
        isLoadingMore: false,
      }));
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Failed to fetch products",
        isLoading: false,
        isLoadingMore: false,
      });
    }
  },

  fetchProductBySlug: async (slug: string) => {
    set({ isLoading: true, error: null, currentProduct: null });
    try {
      const response = await api.get(`/products/${slug}`);
      set({ currentProduct: response.data, isLoading: false });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Failed to fetch product",
        isLoading: false,
      });
    }
  },

  setFilters: (filters) => {
    const newFilters = { ...get().filters, ...filters, page: 1 }; // reset to page 1 on filter change
    set({ filters: newFilters });
    // Fetch with new filters, replacing existing products
    get().fetchProducts(newFilters, false);
  },

  clearFilters: () => {
    set({ filters: {} });
    get().fetchProducts({}, false);
  },

  clearError: () => set({ error: null }),

  resetProducts: () => {
    set({ products: [], currentPage: 1, totalPages: 1, hasMore: false });
  },
}));
