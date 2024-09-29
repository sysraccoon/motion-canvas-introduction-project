import { makeProject } from "@motion-canvas/core";
import audio from "../audio/audio.mp3";

import example from "./scenes/example?scene";
import codeDemo from "./scenes/code-demo?scene";
import polarDemo from "./scenes/polar-demo?scene";

export default makeProject({
  scenes: [
    example,
    codeDemo,
    polarDemo,
  ],
});
