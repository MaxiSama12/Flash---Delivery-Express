import { create } from 'zustand';

export const useLogin = create(set => ({
  id: "",
  nombre: "",
  rol: "",
  telefono: "",
  direccion: "",

  setId: (id) => set(() => ({ id })),
  setNombre: (nombre) => set(() => ({ nombre })),
  setRol: (rol) => set(() => ({ rol })),
  setTelefono: (telefono) => set(() => ({ telefono })),
  setDireccion: (direccion) => set(() => ({ direccion })),
  logout: () => set(() => ({id:"", nombre:"", rol:""}))
}));
