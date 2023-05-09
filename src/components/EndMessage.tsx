import { Text } from "@react-three/drei";

export default function EndMessage() {
  return (
    <Text position={[0, 2.25, 2]}>
      Finish
      <meshBasicMaterial toneMapped={false} />
    </Text>
  );
}
