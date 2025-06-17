import { create } from 'zustand';

export const useLogin = create(set => ({
  id: "",
  nombre: "",
  rol: "",

  setId: (id) => set(() => ({ id })),
  setNombre: (nombre) => set(() => ({ nombre })),
  setRol: (rol) => set(() => ({ rol })),
  logout: () => set(() => ({id:"", nombre:"", rol:""}))
}));
