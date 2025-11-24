import { useEffect } from "react";
import useGameStateStore from "@/hooks/useGameStateStore";

export default function useGameReset(onReset: () => void) {
  const gameResetFlag = useGameStateStore((state) => state.gameResetFlag);

  useEffect(() => {
    if (gameResetFlag === 0) return;
    onReset();
  }, [gameResetFlag, onReset]);
}
