"use client";

import { Canvas } from "@react-three/fiber";
import type { FC } from "react";
import Pitch from "@/components/Pitch";

const Scene: FC = () => {
  return (
    <Canvas className="bg-sky-200" camera={{ position: [0, 0.5, 7] }}>
      <ambientLight />
      <Pitch />
    </Canvas>
  );
};

export default Scene;
