import { create } from 'zustand';

export const useSearchStore = create((set) => ({
  isVisible: false,
  toggleSearch: () => set((state) => ({ isVisible: !state.isVisible })),
}));
