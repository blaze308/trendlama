import { DummyProduct } from "@/types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type WishlistStoreState = {
  wishlist: DummyProduct[];
  hasHydrated: boolean;
};

type WishlistStoreActions = {
  addToWishlist: (product: DummyProduct) => void;
  removeFromWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
  clearWishlist: () => void;
};

const useWishlistStore = create<WishlistStoreState & WishlistStoreActions>()(
  persist(
    (set, get) => ({
      wishlist: [],
      hasHydrated: false,
      addToWishlist: (product) =>
        set((state) => {
          if (state.wishlist.some((p) => p.id === product.id)) return state;
          return { wishlist: [...state.wishlist, product] };
        }),
      removeFromWishlist: (productId) =>
        set((state) => ({
          wishlist: state.wishlist.filter((p) => p.id !== productId),
        })),
      isInWishlist: (productId) =>
        get().wishlist.some((p) => p.id === productId),
      clearWishlist: () => set({ wishlist: [] }),
    }),
    {
      name: "wishlist",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.hasHydrated = true;
        }
      },
    }
  )
);

export default useWishlistStore;
