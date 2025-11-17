import { RigidBody } from "@react-three/rapier";
import type { FC } from "react";
import { Color } from "three";

const Pitch: FC = () => {
  return (
    <RigidBody type="fixed">
      <mesh rotation={[-Math.PI / 2, 0, 0]} castShadow receiveShadow>
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial color={new Color(0x6ef571)} />
      </mesh>
    </RigidBody>
  );
};

export default Pitch;
