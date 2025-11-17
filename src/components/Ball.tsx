import { Sphere } from "@react-three/drei";
import type { FC } from "react";

const Ball: FC = () => {
  return (
    <Sphere
      args={[0.117, 32, 32]}
      position={[0, 0.117, 0]}
      castShadow
      receiveShadow
    />
  );
};

export default Ball;
