import React from "react";
import { render } from "react-dom";
import CanvasContainer from "containers/CanvasContainer";
import "assets/index.sass";

render(
  <CanvasContainer
    canvasWidth={500}
    canvasHeight={500}
    cellSize={10}
    fps={1}
  />,
  document.getElementById("root")
);
