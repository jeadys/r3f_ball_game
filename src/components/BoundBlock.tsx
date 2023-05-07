import {
  boxGeometry,
  endFloorMaterial,
  wallMaterial,
} from "@/materials/Material";
import { RigidBody, CuboidCollider } from "@react-three/rapier";

type WallProps = {
  length: number;
  position: [x: number, y: number, z: number];
};

export default function Wall({ length, position }: WallProps) {
  return (
    <RigidBody type="fixed" restitution={0.2} friction={0}>
      {/* Floor */}
      <mesh
        position={[0, -0.1, -(length * 2) + 2]}
        geometry={boxGeometry}
        material={endFloorMaterial}
        scale={[4, 0.2, (length - 2) * 4]}
        receiveShadow
      />
      {/* Wall */}
      <mesh
        position={[2.15, 0.75, -(length * 2) + 2]}
        geometry={boxGeometry}
        material={wallMaterial}
        scale={[0.3, 1.5, length * 4]}
        castShadow
      />
      {/* Wall */}
      <mesh
        position={[-2.15, 0.75, -(length * 2) + 2]}
        geometry={boxGeometry}
        material={wallMaterial}
        scale={[0.3, 1.5, length * 4]}
        receiveShadow
      />
      {/* Wall */}
      <mesh
        position={[0, 0.75, -(length * 4) + 1.85]}
        geometry={boxGeometry}
        material={wallMaterial}
        scale={[4.6, 1.5, 0.3]}
        receiveShadow
      />
      <CuboidCollider
        args={[2, 0.1, 2 * length]}
        position={[0, -0.1, -(length * 2) + 2]}
        restitution={0.2}
        friction={1}
      />
    </RigidBody>
  );
}
