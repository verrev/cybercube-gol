import React, { Component, createRef } from "react";
import PropTypes from "prop-types";
import Canvas from "components/Canvas";
import {
  initializeGameState,
  addLivingCells,
  updateGameState,
  drawGameStateToCanvas
} from "utils/gameOfLifeHelpers";

const propTypes = {
  canvasWidth: PropTypes.number.isRequired,
  canvasHeight: PropTypes.number.isRequired,
  cellSize: PropTypes.number.isRequired,
  fps: PropTypes.number.isRequired
};

class CanvasContainer extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = createRef();
    this.canvasContext = null;
    this.previousTickTime = performance.now();
    this.gameState = initializeGameState(
      this.props.canvasWidth,
      this.props.canvasHeight,
      this.props.cellSize
    );
    this.setCanvasRef = this.setCanvasRef.bind(this);
    this.tick = this.tick.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    requestAnimationFrame(this.tick);
  }

  componentDidUpdate(prevProps) {
    const {
      canvasWidth: prevCanvasWidth,
      canvasHeight: prevCanvasHeight,
      cellSize: prevCellSize
    } = prevProps;
    const { canvasWidth, canvasHeight, cellSize } = this.props;

    if (
      prevCanvasWidth !== canvasWidth ||
      prevCanvasHeight !== canvasHeight ||
      prevCellSize !== cellSize
    ) {
      this.initializeCanvas();
      this.gameState = initializeGameState(canvasWidth, canvasHeight, cellSize);
    }
  }

  setCanvasRef(canvasRef) {
    this.canvasRef = canvasRef;
    this.initializeCanvas();
  }

  initializeCanvas() {
    this.canvasContext = this.canvasRef.getContext("2d");
    this.canvasContext.setTransform(1, 0, 0, 1, 0, 0);
    this.canvasContext.scale(2, 2);
    this.canvasRef.style.width = `${this.props.canvasWidth}px`;
    this.canvasRef.style.height = `${this.props.canvasHeight}px`;
  }

  tick(currentTickTime) {
    requestAnimationFrame(this.tick);

    const elapsedTime = currentTickTime - this.previousTickTime;
    const secondsPerFrame = 1000 / this.props.fps;

    if (elapsedTime > secondsPerFrame) {
      this.previousTickTime = currentTickTime - (elapsedTime % secondsPerFrame);
      drawGameStateToCanvas(
        this.canvasRef,
        this.canvasContext,
        this.gameState,
        this.props.cellSize
      );
      updateGameState(this.gameState);
    }
  }

  onClick(clickEvent) {
    const {
      gameState,
      canvasRef,
      canvasContext,
      props: { cellSize }
    } = this;
    addLivingCells(gameState, cellSize, clickEvent, canvasRef);
    requestAnimationFrame(() =>
      drawGameStateToCanvas(canvasRef, canvasContext, gameState, cellSize)
    );
  }

  render() {
    return (
      <Canvas
        setCanvasRef={this.setCanvasRef}
        canvasWidth={this.props.canvasWidth * 2}
        canvasHeight={this.props.canvasHeight * 2}
        onClick={this.onClick}
      />
    );
  }
}

CanvasContainer.propTypes = propTypes;

export default CanvasContainer;
