import { create } from "zustand";
import { toast } from "react-toastify";

export const useCartStore = create((set, get) => ({
  cart: [],

  addToCart: (producto) => {
    const cart = get().cart;

    if (cart.length > 0 && cart[0].id_comercio !== producto.id_comercio) {
      toast.error("Solo puedes agregar productos del mismo comercio.");
      return;
    }
    const existing = cart.find((item) => item.id_producto === producto.id_producto);
    if (existing) {
      const updatedCart = cart.map((item) =>
        item.id_producto === producto.id_producto
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
