import { CODE, Code, insert, LezerHighlighter, lines, makeScene2D, remove, replace, word } from "@motion-canvas/2d";
import { all, createRef, DEFAULT, Direction, slideTransition, waitFor } from "@motion-canvas/core";
import { parser } from "@lezer/javascript";
import { colors } from "../utils/colorscheme";
import { Window } from "../components/window";

const typescriptHighlighter = new LezerHighlighter(
  parser.configure({
    dialect: "jsx ts",
  }),
  colors.codeStyle,
);

export default makeScene2D(function*(view) {
  const code = createRef<Code>();
  const funcBody = Code.createSignal("  //body");
  const codeText = CODE`\
function polarToCartesian(
  radius: number, theta: number
) {
${funcBody}
}`;

  view.add(
    <Window
      title={"polar.ts"}
      icon={"tabler:brand-typescript"}
    >
      <Code
        ref={code}    
        code={codeText}
        highlighter={typescriptHighlighter}
        fontSize={42}
        fontFamily={"Source Code Pro"}
      />
    </Window>
  );

  yield* slideTransition(Direction.Right, 0.6);
  yield* waitFor(1);

  const xCoordinate = Code.createSignal(`// x coordinate`);
  const yCoordinate = Code.createSignal(`// y coordinate`);

  yield* funcBody(CODE`\
  return new Vector2(
    ${xCoordinate}
    ${yCoordinate}
  );`, 0.5)
  yield* waitFor(1);

  yield* all(
    xCoordinate('radius * Math.cos(theta * Math.PI/180),', 0.5),
    yCoordinate('radius * Math.sin(theta * Math.PI/180),', 0.5),
  );
  yield* waitFor(1);

  yield* code().selection(
    code().findAllRanges(/radius: number.*/g),
    0.5,
  );
  yield* waitFor(1);

  yield* code().selection(lines(4, 5), 0.5);
  yield* waitFor(1);

  yield* code().selection(DEFAULT, 0.5);
  yield* waitFor(1);
});
