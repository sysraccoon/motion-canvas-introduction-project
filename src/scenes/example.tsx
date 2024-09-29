import {Circle, Icon, Layout, makeScene2D, Rect, Txt} from '@motion-canvas/2d';
import {tween, createRef, map, easeInOutSine, waitFor, all, easeInOutBack, chain, easeOutBack, Reference, waitUntil, useDuration} from '@motion-canvas/core';
import { Window } from '../components/window';

export default makeScene2D(function* (view) {
  const window = createRef<Rect>();
  const message = createRef<Txt>();

  view.add(
    <Window
      ref={window}
      title={"notification"}
      icon={"material-symbols:notifications-active-rounded"}
    >
      <Txt
        ref={message}
        text={"Motion Canvas Introduction"}
        fill={"#cdd6f4"}
        fontSize={72}
        fontFamily={"Source Code Pro"}
      />
    </Window>
  );

  yield* myCoolSpawnAnimation(
    window(),
    useDuration("window-spawn"),
  );

  yield* waitUntil("introduction-wait");

  yield* message().text("Step by Step", 0.5);

  yield* waitFor(1);

  const EMPTY = "\u2800";
  yield* message().text(EMPTY, 0.3);
  yield* message().text("Mastering new instrument", 0.5);

  yield* waitFor(1);
});

function* myCoolSpawnAnimation(
  layout: Layout,
  duration: number = 0.5
) {
  const opacity = layout.opacity();
  const scale = layout.scale();
  const y = layout.y();

  layout.opacity(0);
  layout.scale(scale.scale(0.5));
  layout.y(y + 100);

  yield* all(
    layout.opacity(opacity, duration),
    layout.scale(scale, duration, easeOutBack),
    layout.y(y, duration),
  );
}
