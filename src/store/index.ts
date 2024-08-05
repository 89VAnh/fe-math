import { create } from "zustand";

export const useSubmitTestStore = create((set) => ({
  submitTest: {},
  set: () => set((submitTest: any) => submitTest),
  remove: () => set({}),
}));
