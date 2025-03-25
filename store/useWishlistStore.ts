import { create } from 'zustand';

export type WishlistItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  store?: string;
};

type WishlistState = {
  items: WishlistItem[];
  addItem: (item: WishlistItem) => void;
  removeItem: (id: string) => void;
  clearWishlist: () => void;
  isItemWishlisted: (id: string) => boolean;
};

export const useWishlistStore = create<WishlistState>((set, get) => ({
  items: [],
  
  addItem: (item) => {
    const { items } = get();
    // Check if item already exists
    const exists = items.some(i => i.id === item.id);
    
    if (!exists) {
      set(state => ({
        items: [...state.items, item]
      }));
    }
  },
  
  removeItem: (id) => {
    set(state => ({
      items: state.items.filter(item => item.id !== id)
    }));
  },
  
  clearWishlist: () => {
    set({ items: [] });
  },
  
  isItemWishlisted: (id) => {
    return get().items.some(item => item.id === id);
  }
}));