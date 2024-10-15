import { create } from "zustand";
import { persist } from "zustand/middleware";

type MenuState = {
  menuOpen: boolean;
  toggleMenu: () => void;
};

export const useMenuStore = create<MenuState>()(
  persist(
    (set) => ({
      menuOpen: false,
      toggleMenu: () =>
        set((state) => ({
          menuOpen: !state.menuOpen,
        })),
    }),
    { name: "menu-store" }
  )
);
