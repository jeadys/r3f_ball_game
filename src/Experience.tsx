import { Physics } from "@react-three/rapier";
import { useControls } from "leva";

import Lights from "@/Lights";
import Level from "@/Level";
import Player from "@/Player";

import { useGameStore } from "@/stores/useGame";

export default function Experience() {
  const { isDebug } = useControls("Physics debug", {
    isDebug: false,
  });

  const trapCount = useGameStore((state) => state.trapCount);
  const trapSeed = useGameStore((state) => state.trapSeed);

  return (
    <>
      <Physics debug={isDebug}>
        <Lights />
        <Level trapCount={trapCount} trapSeed={trapSeed} />
        <Player />
      </Physics>

      <color args={["lightblue"]} attach="background" />
    </>
  );
}
