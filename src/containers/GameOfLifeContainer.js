import React, { Component } from "react";
import CanvasContainer from "containers/CanvasContainer";

class GameOfLifeContainer extends Component {
  componentDidMount() {}
  render() {
    return (
      <CanvasContainer
        canvasWidth={500}
        canvasHeight={500}
        cellSize={10}
        fps={1}
      />
    );
  }
}

export default GameOfLifeContainer;
