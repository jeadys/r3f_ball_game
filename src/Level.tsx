import SpinnerBlock from "@/components/SpinnerBlock";
import StartBlock from "@/components/StartBlock";

export default function Level() {
  return (
    <>
      <StartBlock position={[0, 0, 4]} />
      <SpinnerBlock position={[0, 0, 0]} />
    </>
  );
}
