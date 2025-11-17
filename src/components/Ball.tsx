import { Sphere } from "@react-three/drei";
import { type RapierRigidBody, RigidBody } from "@react-three/rapier";
import { type FC, useEffect, useRef } from "react";
import type { Vector3 } from "three";
import useKickStateStore from "@/hooks/useKickStateStore";

const Ball: FC = () => {
  const kickVector = useKickStateStore((state) => state.kickVector);
  const ball = useRef<RapierRigidBody>(null);

  useEffect(() => {
    const kickBall = ({ x, y, z }: Vector3) => {
      if (!ball.current) return;
      ball.current.applyImpulse({ x, y, z }, true);
    };

    // Only apply impulse if there's actual force
    if (kickVector.length() > 0) kickBall(kickVector);
  }, [kickVector]);

  return (
    <RigidBody ref={ball} position={[0, 0.117, 0]} colliders="ball">
      <Sphere args={[0.117, 32, 32]} castShadow receiveShadow />
    </RigidBody>
  );
};

export default Ball;
