import { boxGeometry, startFloorMaterial } from "@/materials/Material";

type StartBlockProps = {
  position: [x: number, y: number, z: number];
};

/**
 *
 * @param position the x, y, z coordinates
 * @returns grouped mesh as JSX Element
 */
export default function StartBlock({ position }: StartBlockProps) {
  return (
    <group position={position}>
      {/* Floor */}
      <mesh
        geometry={boxGeometry}
        material={startFloorMaterial}
        receiveShadow
        position={[0, -0.1, 0]}
        scale={[4, 0.2, 4]}
      />
    </group>
  );
}
