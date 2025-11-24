import { useAnimations, useGLTF } from "@react-three/drei";
import { type JSX, useEffect, useRef } from "react";
import type * as THREE from "three";
import type { GLTF } from "three-stdlib";

type ActionName = "Idle";
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

export default function Keeper(props: JSX.IntrinsicElements["group"]) {
    const group = useRef<THREE.Group>(null);
    const { nodes, materials, animations } = useGLTF(
        "/models/Keeper.glb",
    ) as unknown as GLTFResult;
    const { actions } = useAnimations(animations, group);

    useEffect(() => {
        if (!actions.Idle) return;
        actions.Idle.play();
    }, [actions]);

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

useGLTF.preload("/models/Keeper.glb");
