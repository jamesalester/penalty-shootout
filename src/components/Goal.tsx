import {
  CuboidCollider,
  type IntersectionEnterPayload,
  RigidBody,
} from "@react-three/rapier";
import type { FC } from "react";

type Props = {
  onGoal: () => void;
};

const Goal: FC<Props> = ({ onGoal }) => {
  const onIntersectionEnter = (payload: IntersectionEnterPayload) => {
    if (payload.colliderObject?.name !== "Ball") return;
    onGoal();
  };

  return (
    <RigidBody type="fixed" position={[0, 1.25, -11.25]}>
      <group>
        {/* Left Post */}
        <mesh position={[-3.625, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.25, 2.5, 0.25]} />
          <meshStandardMaterial color="white" />
        </mesh>

        {/* Right Post */}
        <mesh position={[3.625, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.25, 2.5, 0.25]} />
          <meshStandardMaterial color="white" />
        </mesh>

        {/* Crossbar */}
        <mesh position={[0, 1.25, 0]} castShadow receiveShadow>
          <boxGeometry args={[7.5, 0.25, 0.25]} />
          <meshStandardMaterial color="white" />
        </mesh>
      </group>

      <CuboidCollider
        args={[3.25, 1.25, 1]}
        sensor={true}
        onIntersectionEnter={onIntersectionEnter}
      />
    </RigidBody>
  );
};

export default Goal;
