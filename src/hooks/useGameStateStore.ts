import { create } from "zustand";

type StoreValue = {
  gameResetFlag: number;
  resetGame: () => void;
};

const useGameStateStore = create<StoreValue>((set) => ({
  gameResetFlag: 0,
  resetGame: () => set((state) => ({ gameResetFlag: state.gameResetFlag + 1 })),
}));

export default useGameStateStore;
