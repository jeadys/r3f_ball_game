import SpinnerBlock from "@/components/SpinnerBlock";
import StartBlock from "@/components/StartBlock";
import LimboBlock from "@/components/LimboBlock";
import AxeBlock from "@/components/AxeBlock";
import EndBlock from "./components/EndBlock";
import { useMemo } from "react";
import BoundBlock from "./components/BoundBlock";

export default function Level({
  trapCount = 10,
  trapSeed = 0,
  types = [SpinnerBlock, AxeBlock, LimboBlock],
}) {
  const blocks = useMemo(() => {
    const blocks = [];

    for (let i = 0; i < trapCount; i++) {
      const type = types[Math.floor(Math.random() * types.length)];
      blocks.push(type);
    }

    return blocks;
  }, [trapCount, trapSeed, types]);

  return (
    <>
      <StartBlock position={[0, 0, 0]} />

      {blocks.map((Block, index) => (
        <Block key={index} position={[0, 0, -(index + 1) * 4]} />
      ))}

      <EndBlock position={[0, 0, -(trapCount + 1) * 4]} />

      <BoundBlock length={trapCount + 2} position={[0, 0, 0]} />
    </>
  );
}
