import { useFrame } from "@react-three/fiber";
import { RapierRigidBody, RigidBody } from "@react-three/rapier";
import { useRef, useState } from "react";
import { boxGeometry, obstacleMaterial } from "@/materials/Material";

type LimboBlockProps = {
  position: [x: number, y: number, z: number];
};

/**
 *
 * @param position the x, y, z coordinates
 * @returns grouped mesh as JSX Element
 */
export default function LimboBlock({ position }: LimboBlockProps) {
  const [timeOffset] = useState(() => Math.random() * Math.PI * 2);
  const limboRef = useRef<RapierRigidBody>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (!limboRef.current) return null;
    const yPosition = Math.sin(time + timeOffset) + 1.15;
    limboRef.current.setNextKinematicTranslation({
      x: position[0],
      y: position[0] + yPosition,
      z: position[2],
    });
  });

  return (
    <group position={position}>
      {/* Spinner */}
      <RigidBody
        ref={limboRef}
        type="kinematicPosition"
        restitution={0.2}
        friction={0}
      >
        <mesh
          geometry={boxGeometry}
          material={obstacleMaterial}
          position={[0, 0, 0]}
          scale={[3.5, 0.15, 0.25]}
          receiveShadow
          castShadow
        />
      </RigidBody>
    </group>
  );
}
