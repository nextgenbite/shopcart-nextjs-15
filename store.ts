import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "./types/active_ecommerce_json";


export interface CartItem {
  product: Product;
  quantity: number;
}

interface StoreState {
  items: CartProduct[];
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  deleteCartProduct: (productId: number) => void;
  resetCart: () => void;
  getTotalPrice: () => number;
  getSubTotalPrice: () => number;
  getItemCount: (productId: number) => number;
  getGroupedItems: () => CartItem[];
  //   // favorite
  favoriteProduct: Product[];
  addToFavorite: (product: Product) => Promise<void>;
  removeFromFavorite: (productId: number) => void;
  resetFavorite: () => void;
}

const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      items: [],
      favoriteProduct: [],
      addItem: (product) =>
        set((state) => {
          const existingItem = state.items.find(
            (item) => Number(item.id) === Number(product.id)
          );
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                Number(item.id) === Number(product.id)
                  ? {
                      ...item,
                      quantity: item.quantity + 1,
                      total: (item.price ?? 0) * (item.quantity + 1),
                      discountedPrice:
                        (item.price ?? 0) -
                        ((item.discountPercentage ?? 0) * (item.price ?? 0)) / 100,
                    }
                  : item
              ),
            };
          } else {
            const price = product.price ?? 0;
            const discountPercentage = product.discountPercentage ?? 0;
            const discountedPrice =
              price - (discountPercentage * price) / 100;
            const newItem: CartProduct = {
              id: product.id,
              title: product.title,
              price,
              quantity: 1,
              total: price,
              discountPercentage,
              discountedPrice,
            };
            return { items: [...state.items, newItem] };
          }
        }),
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.reduce((acc, item) => {
            if (Number(item.id) === Number(productId)) {
              if (item.quantity > 1) {
                acc.push({
                  ...item,
                  quantity: item.quantity - 1,
                  total: (item.price ?? 0) * (item.quantity - 1),
                  discountedPrice:
                    (item.price ?? 0) -
                    ((item.discountPercentage ?? 0) * (item.price ?? 0)) / 100,
                });
              }
            } else {
              acc.push(item);
            }
            return acc;
          }, [] as CartProduct[]),
        })),
      deleteCartProduct: (productId) =>
        set((state) => ({
          items: state.items.filter(
            (item) => Number(item.id) !== Number(productId)
          ),
        })),
      resetCart: () => set({ items: [] }),
      getTotalCartCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + (item.price ?? 0) * item.quantity,
          0
        );
      },
      getSubTotalPrice: () => {
        return get().items.reduce((total, item) => {
          const price = item.price ?? 0;
          const discount = ((item.discountPercentage ?? 0) * price) / 100;
          const discountedPrice = price - discount;
          return total + discountedPrice * item.quantity;
        }, 0);
      },
      getItemCount: (productId) => {
        const item = get().items.find((item) => Number(item.id) === Number(productId));
        return item ? item.quantity : 0;
      },
      getGroupedItems: () => get().items,
      addToFavorite: (product: Product) => {
        return new Promise<void>((resolve) => {
          set((state: StoreState) => {
            const isFavorite = state.favoriteProduct.some(
              (item) => item.id === product.id
            );
            return {
              favoriteProduct: isFavorite
                ? state.favoriteProduct.filter((item) => item.id !== product.id)
                : [...state.favoriteProduct, { ...product }],
            };
          });
          resolve();
        });
      },
      removeFromFavorite: (productId: number) => {
        set((state: StoreState) => ({
          favoriteProduct: state.favoriteProduct.filter(
            (item) => Number(item?.id) !== Number(productId)
          ),
        }));
      },
      resetFavorite: () => {
        set({ favoriteProduct: [] });
      },
    }),
    {
      name: "cart-store",
    }
  )
);

export default useStore;