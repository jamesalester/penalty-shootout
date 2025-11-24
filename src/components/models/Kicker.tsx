import { useAnimations, useGLTF } from "@react-three/drei";
import { act, type JSX, useEffect, useRef } from "react";
import * as THREE from "three";
import type { GLTF } from "three-stdlib";
import useKickStateStore from "@/hooks/useKickStateStore";

type ActionName = "Idle" | "Kick";
interface GLTFAction extends THREE.AnimationClip {
    name: ActionName;
}

type GLTFResult = GLTF & {
    nodes: {
        Beta_Joints: THREE.SkinnedMesh;
        Beta_Surface: THREE.SkinnedMesh;
        mixamorigHips: THREE.Bone;
    };
    materials: {
        Beta_Joints_MAT1: THREE.MeshPhysicalMaterial;
        Beta_HighLimbsGeoSG3: THREE.MeshPhysicalMaterial;
    };
    animations: GLTFAction[];
};

export default function Kicker(props: JSX.IntrinsicElements["group"]) {
    const group = useRef<THREE.Group>(null);
    const { nodes, materials, animations } = useGLTF(
        "/models/Kicker.glb",
    ) as unknown as GLTFResult;
    const { mixer, actions } = useAnimations(animations, group);

    const shouldKick = useKickStateStore((state) => state.kickVector.length() > 0);

    useEffect(() => {
        if (!actions.Idle) return;
        actions.Idle.play();
    }, [actions]);

    useEffect(() => {
        if (!actions.Kick || !shouldKick) return;
        actions.Kick.reset().play();
        actions.Kick.loop = THREE.LoopOnce;
        actions.Kick.clampWhenFinished = true;
        actions.Idle && actions.Kick.crossFadeFrom(actions.Idle, 0.3, false);
        mixer.addEventListener("finished", () => {
            if (!actions.Idle) return;
            actions.Idle.reset().play();
            actions.Kick && actions.Idle.crossFadeFrom(actions.Kick, 0.005, false);
        });
    }, [actions, mixer, shouldKick]);

    return (
        <group ref={group} {...props} dispose={null} castShadow receiveShadow>
            <group name="Scene">
                <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
                    <skinnedMesh
                        name="Beta_Joints"
                        geometry={nodes.Beta_Joints.geometry}
                        material={materials.Beta_Joints_MAT1}
                        skeleton={nodes.Beta_Joints.skeleton}
                        castShadow
                        receiveShadow
                    />
                    <skinnedMesh
                        name="Beta_Surface"
                        geometry={nodes.Beta_Surface.geometry}
                        material={materials.Beta_HighLimbsGeoSG3}
                        skeleton={nodes.Beta_Surface.skeleton}
                        castShadow
                        receiveShadow
                    />
                    <primitive object={nodes.mixamorigHips} />
                </group>
            </group>
        </group>
    );
}

useGLTF.preload("/models/Kicker.glb");
