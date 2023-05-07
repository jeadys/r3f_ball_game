import { useFrame } from "@react-three/fiber";
import { RapierRigidBody, RigidBody } from "@react-three/rapier";
import { useRef, useState } from "react";
import { boxGeometry, obstacleMaterial } from "@/materials/Material";

type AxeBlockProps = {
  position: [x: number, y: number, z: number];
};

/**
 *
 * @param position the x, y, z coordinates
 * @returns grouped mesh as JSX Element
 */
export default function AxeBlock({ position }: AxeBlockProps) {
  const [timeOffset] = useState(() => Math.random() * Math.PI * 2);
  const axeRef = useRef<RapierRigidBody>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (!axeRef.current) return null;
    const xPosition = Math.sin(time + timeOffset) * 1.25;
    axeRef.current.setNextKinematicTranslation({
      x: position[0] + xPosition,
      y: position[0] + 1,
      z: position[2],
    });
  });

  return (
    <group position={position}>
      {/* Axe */}
      <RigidBody
        ref={axeRef}
        type="kinematicPosition"
        restitution={0.2}
        friction={0}
      >
        <mesh
          geometry={boxGeometry}
          material={obstacleMaterial}
          position={[0, 0, 0]}
          scale={[1.5, 1.5, 0.25]}
          receiveShadow
          castShadow
        />
      </RigidBody>
    </group>
  );
}
