import { DepthOfField, EffectComposer } from "@react-three/postprocessing";

export default function Effects() {
  return (
    <EffectComposer disableNormalPass>
      <DepthOfField focusDistance={0.01} focusRange={0.2} bokehScale={3} />
    </EffectComposer>
  );
}
