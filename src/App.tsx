import { Canvas } from "@react-three/fiber";
import { Perf } from "r3f-perf";

import "./App.css";
import Experience from "@/Experience";

function App() {
  return (
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
  );
}

export default App;
