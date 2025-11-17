"use client";

import { Canvas } from "@react-three/fiber";
import type { FC } from "react";
import Ball from "@/components/Ball";
import Goal from "@/components/Goal";
import Pitch from "@/components/Pitch";

const Scene: FC = () => {
  return (
    <Canvas className="bg-sky-200" camera={{ position: [0, 0.5, 7], fov: 70 }}>
      <ambientLight />

      <group position={[0, -1, 0]}>
        <Pitch />
        <Goal />
        <Ball />
      </group>
    </Canvas>
  );
};

export default Scene;
