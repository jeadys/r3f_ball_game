import { Canvas } from "@react-three/fiber";
import { KeyboardControls } from "@react-three/drei";
import { Perf } from "r3f-perf";

import "./App.css";
import Experience from "@/Experience";
import Interface from "@/Interface";

function App() {
  return (
    <KeyboardControls
      map={[
        {
          name: "forward",
          keys: ["ArrowUp", "KeyW"],
        },
        {
          name: "backward",
          keys: ["ArrowDown", "KeyS"],
        },
        {
          name: "leftward",
          keys: ["ArrowLeft", "KeyA"],
        },
        {
          name: "rightward",
          keys: ["ArrowRight", "KeyD"],
        },
        {
          name: "jump",
          keys: ["Space"],
        },
      ]}
    >
      <Canvas
        shadows
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [2.5, 4, 6],
        }}
      >
        <Experience />
        <Perf position="top-left" />
      </Canvas>
      <Interface />
    </KeyboardControls>
  );
}

export default App;
