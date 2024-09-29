import { Circle, CurveProps, Grid, Latex, Layout, Line, makeScene2D } from "@motion-canvas/2d";
import { all, createRef, createSignal, Direction, slideTransition, Vector2, waitFor } from "@motion-canvas/core";
import { colors } from "../utils/colorscheme";
import { Window } from "../components/window";

export default makeScene2D(function*(view) {
  const radius = createSignal(250);
  const theta = createSignal(0);
  const cartesianPosition = createSignal(
    () => polarToCartesian(radius(), theta())
  );
  const scenePosition = createSignal(
    () => cartesianPosition().mul([1, -1])
  );

  const lineStyle: CurveProps = {
    lineWidth: 12,
    lineCap: "round",
  };

  const fullCircle = createRef<Circle>();

  view.add(
    <Window
      title={"polar coordinates demo"}
      icon={"tabler:math-function"}
      size={[1200, 1300]}
    >
      <Layout layout={false}>
        <Grid
          size={[1100, 1100]}
          stroke={colors.foregroundAlt}
          spacing={100}
        />
        <Line
          points={[
            Vector2.zero,
            () => scenePosition(),
          ]}
          stroke={colors.green}
          {...lineStyle}
        />
        <Circle
          ref={fullCircle}
          size={() => radius() * 2}
          stroke={colors.foreground}
          {...lineStyle}
        />
        <Circle
          size={() => radius() * 2}
          stroke={colors.green}
          {...lineStyle}
          startAngle={0}
          endAngle={() => theta()}
          scaleY={-1}
        />
        <Circle
          position={() => scenePosition()}
          fill={colors.green} 
          size={42}
          stroke={colors.backgroundAlt}
          {...lineStyle}
        />

        <Latex
          position={() => fullCircle().bottom().addY(150)}
          tex={() => {
            const x = cartesianPosition().x.toFixed(1);
            const y = cartesianPosition().y.toFixed(1);
            return `(x, y) = (${x}, ${y})`;
          }}
          fill={colors.foreground}
          fontSize={42}
        />
        <Latex
          position={
            () => scenePosition()
              .add(scenePosition().normalized.mul(50))
          }
          offset={() => scenePosition().normalized.mul(-1)}
          tex={() => `r=${radius().toFixed(1)}`}
          fill={colors.foreground}
          fontSize={42}
        />
        <Latex
          tex={() => `\\theta = ${theta().toFixed(1)}`}
          fill={colors.foreground}
          fontSize={42}
          position={() => scenePosition().normalized.mul(-40)}
          offset={() => scenePosition().normalized}
        />
      </Layout>
    </Window>
  );

  yield* slideTransition(Direction.Bottom, 0.6);
  yield* waitFor(0.8);
  yield* theta(45, 0.5);
  yield* waitFor(0.8);
  yield* radius(300, 0.5);
  yield* waitFor(0.8);
  yield* all(
    theta(270, 0.5),
    radius(250, 0.5),
  );
  yield* waitFor(0.8);
});

function polarToCartesian(radius: number, theta: number) {
  return new Vector2(
    radius * Math.cos(theta * Math.PI / 180),
    radius * Math.sin(theta * Math.PI / 180),
  );
}

