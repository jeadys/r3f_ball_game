import { Canvas } from "@react-three/fiber";
import { Perf } from "r3f-perf";

import "./App.css";
import Experience from "@/Experience";

function App() {
  return (
    <Canvas shadows camera={{ position: [0, 2, 10] }}>
      <Experience />
      <Perf position="top-left" />
    </Canvas>
  );
}

export default App;
