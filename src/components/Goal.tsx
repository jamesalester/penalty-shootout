import type { FC } from "react";

const Goal: FC = () => {
  return (
    <group position={[0, 1.3, -11.25]}>
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
  );
};

export default Goal;
