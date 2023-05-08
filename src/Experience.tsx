import { Physics } from "@react-three/rapier";
import { useControls } from "leva";

import Lights from "@/Lights";
import Level from "@/Level";
import Player from "@/Player";

export default function Experience() {
  const { isDebug } = useControls("Physics debug", {
    isDebug: false,
  });

  return (
    <>
      <Physics debug={isDebug}>
        <Lights />
        <Level />
        <Player />
      </Physics>

      <color args={["lightblue"]} attach="background" />
    </>
  );
}
