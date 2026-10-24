import { create } from "zustand";

type ToastType = "error" | "success" | "warning" | "info" | "coming";

interface ToastState {
  type: ToastType;
  message: string;
  isOpen: boolean;
  show: (message: string, type: ToastType) => void;
  dismiss: () => void;
}

export const useToastStore = create<ToastState>((set) => ({
  type: "info",
  message: "",
  isOpen: false,
  show: (message, type) => {
    set({ message, type, isOpen: true });
  },
  dismiss: () => {
    set({ isOpen: false });
  },
}));