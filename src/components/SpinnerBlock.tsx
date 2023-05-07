import { useFrame } from "@react-three/fiber";
import { RapierRigidBody, RigidBody } from "@react-three/rapier";
import { useRef, useState } from "react";
import { Euler, Quaternion } from "three";
import {
  boxGeometry,
  endFloorMaterial,
  obstacleMaterial,
} from "../materials/Material";

type SpinnerBlockProps = {
  position: [x: number, y: number, z: number];
};

/**
 *
 * @param position the x, y, z coordinates
 * @returns grouped mesh as JSX Element
 */
export default function SpinnerBlock({ position }: SpinnerBlockProps) {
  const [speed] = useState(
    () => (Math.random() + 0.2) * (Math.random() < 0.5 ? -1 : 1)
  );
  const spinnerRef = useRef<RapierRigidBody>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (!spinnerRef.current) return null;
    const rotation = new Quaternion();
    rotation.setFromEuler(new Euler(0, time * speed, 0));
    spinnerRef.current.setNextKinematicRotation(rotation);
  });

  return (
    <group position={position}>
      {/* Floor */}
      <mesh
        geometry={boxGeometry}
        material={endFloorMaterial}
        position={[0, -0.1, 0]}
        scale={[4, 0.2, 4]}
        receiveShadow
      />
      {/* Spinner */}
      <RigidBody
        ref={spinnerRef}
        type="kinematicPosition"
        restitution={0.2}
        friction={0}
      >
        <mesh
          geometry={boxGeometry}
          material={obstacleMaterial}
          position={[0, 0.3, 0]}
          scale={[0.25, 0.15, 3.5]}
          receiveShadow
          castShadow
        />
      </RigidBody>
    </group>
  );
}
