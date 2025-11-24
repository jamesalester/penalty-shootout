"use client";

import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { type FC, Suspense } from "react";
import Ball from "@/components/Ball";
import Goal from "@/components/Goal";
import KickDetector from "@/components/KickDetector";
import Keeper from "@/components/models/Keeper";
import Kicker from "@/components/models/Kicker";
import Pitch from "@/components/Pitch";
import useGameStateStore from "@/hooks/useGameStateStore";

const Scene: FC = () => {
  const resetGame = useGameStateStore((state) => state.resetGame);

  const onGoal = () => {
    console.log("Goal scored!");
    setTimeout(() => {
      resetGame();
    }, 2000);
  };

  return (
    <>
      <Canvas
        className="bg-sky-200"
        camera={{ position: [0, 0.5, 7], fov: 70 }}
        shadows
      >
        {/* Lights */}
        <ambientLight />
        <directionalLight
          position={[5, 10, 7.5]}
          intensity={1.5}
          castShadow
          shadow-camera-right={15}
          shadow-camera-top={15}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />

        {/* Scene Objects */}
        <Suspense>
          <group position={[0, -1, 0]}>
            <Physics>
              <Pitch />
              <Goal onGoal={onGoal} />
              <Keeper position={[0, 0, -10]} />
              <Ball />
              <Kicker position={[-1, 0, 4]} rotation={[0, Math.PI, 0]} />
            </Physics>
          </group>
        </Suspense>
      </Canvas>

      <KickDetector />

      <button
        type="button"
        className="absolute bottom-4 right-4 -translate-x-1/2 rounded bg-background px-4 py-2 shadow-lg"
        onClick={resetGame}
      >
        Reset Game
      </button>
    </>
  );
};

export default Scene;
