import { RigidBody } from "@react-three/rapier";

export default function Level() {
  return (
    <>
      <RigidBody colliders="ball">
        <mesh castShadow position-x={-2} position-y={2}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial color="orange" />
        </mesh>
      </RigidBody>

      <RigidBody colliders="cuboid">
        <mesh castShadow position-x={2} position-y={2}>
          <boxGeometry args={[1.5, 1.5, 1.5]} />
          <meshStandardMaterial color="mediumpurple" />
        </mesh>
      </RigidBody>

      <RigidBody type="fixed">
        <mesh receiveShadow position-y={-1} rotation-x={-Math.PI * 0.5}>
          <boxGeometry args={[10, 10, 0.5]} />
          <meshStandardMaterial color="greenyellow" />
        </mesh>
      </RigidBody>
    </>
  );
}
