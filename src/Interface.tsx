import { useKeyboardControls } from "@react-three/drei";
import { addEffect } from "@react-three/fiber";
import { useEffect, useRef } from "react";

import { useGameStore } from "@/stores/useGame";

export default function Interface() {
  const forward = useKeyboardControls((state) => state.forward);
  const backward = useKeyboardControls((state) => state.backward);
  const leftward = useKeyboardControls((state) => state.leftward);
  const rightward = useKeyboardControls((state) => state.rightward);
  const jump = useKeyboardControls((state) => state.jump);

  const restart = useGameStore((state) => state.restart);
  const phase = useGameStore((state) => state.phase);

  const timeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsubscribeEffect = addEffect(() => {
      const state = useGameStore.getState();

      let elapsedTime = 0;

      if (state.phase === "playing") elapsedTime = Date.now() - state.startTime;
      else if (state.phase === "ended")
        elapsedTime = state.endTime - state.startTime;

      elapsedTime /= 1000;
      elapsedTime = Number(elapsedTime.toFixed(2));

      if (!timeRef.current) return null;
      timeRef.current.textContent = elapsedTime.toString();
    });

    return () => unsubscribeEffect();
  }, []);

  return (
    <div className="interface">
      {/* Time */}
      <div ref={timeRef} className="time">
        0.00
      </div>
      {/* Restart */}
      {phase === "ended" && (
        <div className="restart" onClick={restart}>
          Restart
        </div>
      )}
      {/* Controls */}
      <div className="controls">
        <div className="raw">
          <div className={`key ${forward ? "active" : ""}`}></div>
        </div>
        <div className="raw">
          <div className={`key ${leftward ? "active" : ""}`}></div>
          <div className={`key ${backward ? "active" : ""}`}></div>
          <div className={`key ${rightward ? "active" : ""}`}></div>
        </div>
        <div className="raw">
          <div className={`key large ${jump ? "active" : ""}`}></div>
        </div>
      </div>
    </div>
  );
}
