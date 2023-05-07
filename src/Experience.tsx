import { OrbitControls } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import { useControls } from "leva";

import Lights from "@/Lights";
import Level from "@/Level";

export default function Experience() {
  const { isDebug } = useControls("Physics debug", {
    isDebug: false,
  });

  return (
    <>
      <OrbitControls makeDefault />
      <Physics debug={isDebug}>
        <Lights />
        <Level />
      </Physics>
    </>
  );
}
