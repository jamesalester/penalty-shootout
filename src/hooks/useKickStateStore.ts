import { Vector3 } from "three";
import { create } from "zustand";

type StoreValue = {
  kickVector: Vector3;
  setKickVector: (kickVector: Vector3) => void;
};

const useKickStateStore = create<StoreValue>((set) => ({
  kickVector: new Vector3(0, 0, 0),
  setKickVector: (kickVector: Vector3) => set({ kickVector }),
}));

export default useKickStateStore;
