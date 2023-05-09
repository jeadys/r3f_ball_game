import { boxGeometry, startFloorMaterial } from "@/materials/Material";
import { useGLTF } from "@react-three/drei";
import { RigidBody, CylinderCollider } from "@react-three/rapier";
import EndMessage from "./EndMessage";

type EndBlockProps = {
  position: [x: number, y: number, z: number];
};

/**
 *
 * @param position the x, y, z coordinates
 * @returns grouped mesh as JSX Element
 */
export default function EndBlock({ position }: EndBlockProps) {
  const hamburger = useGLTF("./hamburger.glb");

  hamburger.scene.children.forEach((mesh) => {
    mesh.castShadow = true;
  });

  return (
    <group position={position}>
      <EndMessage />

      {/* Floor */}
      <mesh
        geometry={boxGeometry}
        material={startFloorMaterial}
        receiveShadow
        position={[0, -0.1, 0]}
        scale={[4, 0.2, 4]}
      />
      <RigidBody colliders={false} type="fixed" restitution={0.2} friction={0}>
        <CylinderCollider args={[0.5, 1]} position={[0, 0.5, 0]} />
        <primitive object={hamburger.scene} scale={0.2} />
      </RigidBody>
    </group>
  );
}
