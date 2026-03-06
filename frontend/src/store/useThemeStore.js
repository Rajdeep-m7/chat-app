import { create } from "zustand";

export const useTheme = create((set)=>({
    theme: localStorage.getItem("theme") || "cupcake",
    setTheme: (theme) => {
        localStorage.setItem("theme", theme);
        set({ theme });
    }
}));

