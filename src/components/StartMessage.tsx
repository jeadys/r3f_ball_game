import { Float, Text } from "@react-three/drei";

export default function StartMessage() {
  return (
    <Float floatIntensity={0.25} rotationIntensity={0.25}>
      <Text
        scale={0.25}
        maxWidth={0.25}
        lineHeight={0.75}
        textAlign="right"
        position={[0.75, 0.65, 0]}
        rotation-y={-0.25}
      >
        Marble Race
        <meshBasicMaterial toneMapped={false} />
      </Text>
    </Float>
  );
}
