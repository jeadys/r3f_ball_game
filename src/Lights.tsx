import { useRef } from "react";
import { useHelper } from "@react-three/drei";
import { DirectionalLight, DirectionalLightHelper } from "three";
import { useFrame } from "@react-three/fiber";

export default function Lights() {
  const directionalLightRef = useRef<DirectionalLight>(null!);
  useHelper(directionalLightRef, DirectionalLightHelper, 1, "red");

  useFrame((state) => {
    directionalLightRef.current.position.z = state.camera.position.z + 1 - 4;
    directionalLightRef.current.target.position.z = state.camera.position.z - 4;
    directionalLightRef.current.target.updateMatrixWorld();
  });

  return (
    <>
      <directionalLight
        ref={directionalLightRef}
        castShadow
        position={[4, 4, 1]}
        intensity={1.5}
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={10}
        shadow-camera-top={10}
        shadow-camera-right={10}
        shadow-camera-bottom={-10}
        shadow-camera-left={-10}
      />
      <ambientLight intensity={0.5} />
    </>
  );
}
