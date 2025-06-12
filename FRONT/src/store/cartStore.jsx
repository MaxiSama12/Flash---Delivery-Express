import { create } from 'zustand';

const useCartStore = create((set) => ({
  cartCount: 2,
  addToCart: () => set((state) => ({ cartCount: state.cartCount + 1 })),
  removeFromCart: () => set((state) => ({ cartCount: Math.max(0, state.cartCount - 1) })),
}));

export default useCartStore;