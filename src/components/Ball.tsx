import { Sphere } from "@react-three/drei";
import { type RapierRigidBody, RigidBody } from "@react-three/rapier";
import { type FC, useEffect, useRef } from "react";
import type { Vector3 } from "three";
import useGameReset from "@/hooks/useGameReset";
import useKickStateStore from "@/hooks/useKickStateStore";

const Ball: FC = () => {
  const kickVector = useKickStateStore((state) => state.kickVector);
  const ball = useRef<RapierRigidBody>(null);

  useGameReset(() => {
    if (!ball.current) return;
    ball.current.setTranslation({ x: 0, y: 0.117, z: 0 }, true);
    ball.current.setRotation({ x: 0, y: 0, z: 0, w: 1 }, true);
    ball.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
    ball.current.setAngvel({ x: 0, y: 0, z: 0 }, true);
  });

  useEffect(() => {
    const kickBall = ({ x, y, z }: Vector3) => {
      if (!ball.current) return;
      ball.current.applyImpulse({ x, y, z }, true);
    };

    // Only apply impulse if there's actual force
    if (kickVector.length() > 0) kickBall(kickVector);
  }, [kickVector]);

  return (
    <RigidBody ref={ball} position={[0, 0.117, 0]} colliders="ball" name="Ball">
      <Sphere args={[0.117, 32, 32]} castShadow receiveShadow />
    </RigidBody>
  );
};

export default Ball;
