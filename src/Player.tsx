import { useFrame } from "@react-three/fiber";
import { RapierRigidBody, RigidBody, useRapier } from "@react-three/rapier";
import { useKeyboardControls } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import { Vector3 } from "three";
import { useGameStore } from "./stores/useGame";

export default function Player() {
  const [subscribeKeys, getKeys] = useKeyboardControls();
  const playerRef = useRef<RapierRigidBody>(null);
  const { rapier, world } = useRapier();
  const rapierWorld = world.raw();

  const start = useGameStore((state) => state.start);
  const end = useGameStore((state) => state.end);
  const restart = useGameStore((state) => state.restart);
  const trapCount = useGameStore((state) => state.trapCount);

  const [smoothedCameraPosition] = useState(() => new Vector3(10, 10, 10));
  const [smoothedCameraTarget] = useState(() => new Vector3());

  const jump = () => {
    if (!playerRef.current) return null;

    const origin = playerRef.current.translation();
    origin.y -= 0.31;
    const direction = { x: 0, y: -1, z: 0 };
    const ray = new rapier.Ray(origin, direction);
    const hit = rapierWorld.castRay(ray, 10, true);

    if (hit && hit.toi < 0.15)
      playerRef.current.applyImpulse({ x: 0, y: 0.5, z: 0 }, false);
  };

  useEffect(() => {
    const unsubscribeJump = subscribeKeys(
      (state) => state.jump,
      (value) => {
        if (value) jump();
      }
    );

    const unsubscribeAny = subscribeKeys(() => {
      start();
    });

    return () => {
      unsubscribeJump();
      unsubscribeAny();
    };
  }, []);

  /**
   * In the reset function, we are going to call three functions on the body reference in order to reset the marble:
   * setTranslation to put it back at the origin
   * setLinvel to remove any translation force
   * setAngvel to remove any angular force
   */
  const reset = () => {
    if (!playerRef.current) return null;

    playerRef.current.setTranslation({ x: 0, y: 1, z: 0 }, false);
    playerRef.current.setLinvel({ x: 0, y: 0, z: 0 }, false);
    playerRef.current.setAngvel({ x: 0, y: 0, z: 0 }, false);
  };

  useEffect(() => {
    const unsubscribeReset = useGameStore.subscribe(
      (state) => state.phase,
      (value) => {
        if (value === "ready") reset();
      }
    );

    return () => {
      unsubscribeReset();
    };
  });

  useFrame((state, delta) => {
    if (!playerRef.current) return null;

    /**
     * Controls
     */
    const { forward, backward, leftward, rightward } = getKeys();

    const impulse = { x: 0, y: 0, z: 0 };
    const torque = { x: 0, y: 0, z: 0 };

    const impulseStrength = 0.6 * delta;
    const torqueStrength = 0.2 * delta;

    if (forward) {
      impulse.z -= impulseStrength;
      torque.x -= torqueStrength;
    }

    if (rightward) {
      impulse.x += impulseStrength;
      torque.z -= torqueStrength;
    }

    if (backward) {
      impulse.z += impulseStrength;
      torque.x += torqueStrength;
    }

    if (leftward) {
      impulse.x -= impulseStrength;
      torque.z += torqueStrength;
    }

    playerRef.current.applyImpulse(impulse, false);
    playerRef.current.applyTorqueImpulse(torque, false);
  });

  useFrame((state, delta) => {
    if (!playerRef.current) return null;

    /**
     * Camera
     */
    const playerPosition = playerRef.current.translation();

    const cameraPosition = new Vector3();
    cameraPosition.x = playerPosition.x;
    cameraPosition.y = playerPosition.y + 0.65;
    cameraPosition.z = playerPosition.z + 2.25;

    const cameraTarget = new Vector3();
    cameraTarget.x = playerPosition.x;
    cameraTarget.y = playerPosition.y + 0.25;
    cameraTarget.z = playerPosition.z;

    smoothedCameraPosition.lerp(cameraPosition, 5 * delta);
    smoothedCameraTarget.lerp(cameraTarget, 5 * delta);

    state.camera.position.copy(smoothedCameraPosition);
    state.camera.lookAt(smoothedCameraTarget);
  });

  useFrame(() => {
    if (!playerRef.current) return null;

    /**
     * Phases
     */
    const playerPosition = playerRef.current.translation();
    if (playerPosition.z < -(trapCount * 4 + 2)) end();
    if (playerPosition.y < -4) restart();
  });

  return (
    <RigidBody
      ref={playerRef}
      colliders="ball"
      restitution={0.2}
      friction={1}
      linearDamping={0.5}
      angularDamping={0.5}
      position={[0, 1, 0]}
    >
      <mesh castShadow>
        <icosahedronGeometry args={[0.3, 1]} />
        <meshStandardMaterial flatShading color="mediumPurple" />
      </mesh>
    </RigidBody>
  );
}
