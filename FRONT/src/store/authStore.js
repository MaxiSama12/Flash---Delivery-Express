/*import { create } from "zustand";

export const useAuthStore = create((set) => ({
  usuario: null,

  login: (usuarioData) => set({ usuario: usuarioData }),

  logout: () => set({ usuario: null }),
}));*/
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      usuario: null,

      login: (usuarioData) => set({ usuario: usuarioData }),
      logout: () => set({ usuario: null }),
    }),
    {
      name: "auth-storage",
      getStorage: () => localStorage,
    }
  )
);

