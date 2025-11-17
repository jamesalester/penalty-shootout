import { useDrag } from "@use-gesture/react";
import type { FC } from "react";
import { Vector3 } from "three";
import useKickStateStore from "@/hooks/useKickStateStore";

const KICK_FORCE = 0.0005;

const KickDetector: FC = () => {
  const setKickVector = useKickStateStore((state) => state.setKickVector);

  const bind = useDrag((state) => {
    if (state.last) {
      const [dx, dy] = state.movement;
      const forceX = dx * KICK_FORCE;
      const forceY = Math.abs(dy) * KICK_FORCE * 0.5;

      const dragDistance = Math.sqrt(dx * dx + dy * dy);
      const forceZ = -Math.min(dragDistance * KICK_FORCE * 2, 20);

      const kickVector = new Vector3(forceX, forceY, forceZ);
      setKickVector(kickVector);
    }
  });

  return <div {...bind()} className="absolute inset-0 touch-none" />;
};

export default KickDetector;
