import { create } from "zustand";

export const useCartStore = create((set, get) => ({
  cart: [],

  addToCart: (producto) => {
    const cart = get().cart;
    const existing = cart.find((item) => item.id === producto.id);
    if (existing) {
      const updatedCart = cart.map((item) =>
        item.id === producto.id
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      );
      set({ cart: updatedCart });
    } else {
      set({ cart: [...cart, { ...producto, cantidad: 1 }] });
    }
  },

  removeFromCart: (id) => {
    const updatedCart = get().cart.filter((item) => item.id !== id);
    set({ cart: updatedCart });
  },

  decreaseQuantity: (id) => {
    const updatedCart = get()
      .cart.map((item) =>
        item.id === id ? { ...item, cantidad: item.cantidad - 1 } : item
      )
      .filter((item) => item.cantidad > 0);
    set({ cart: updatedCart });
  },

  clearCart: () => set({ cart: [] }),

  total: () =>
    get().cart.reduce((acc, item) => acc + item.precio * item.cantidad, 0),
  
  itemsCount: () => get().cart.reduce((acc, item) => acc + item.cantidad, 0),
}));
