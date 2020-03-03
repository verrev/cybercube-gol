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
  fps: PropTypes.number.isRequired
};

class CanvasContainer extends Component {
  static CELL_SIZE = 10;

  constructor(props) {
    super(props);

    this.canvasRef = createRef();
    this.canvasWrapperRef = createRef();
    this.canvasContext = null;
    this.isRunning = true;
    this.state = {
      previousTickTime: performance.now(),
      isAddingLiveCells: false
    };

    this.setCanvasRef = this.setCanvasRef.bind(this);
    this.setCanvasWrapperRef = this.setCanvasWrapperRef.bind(this);
    this.tick = this.tick.bind(this);
    this.onPointerDown = this.onPointerDown.bind(this);
    this.onPointerMove = this.onPointerMove.bind(this);
    this.onPointerUp = this.onPointerUp.bind(this);
    this.onResize = this.onResize.bind(this);
    this.addLiveCells = this.addLiveCells.bind(this);
  }

  componentDidMount() {
    this.canvasContext = this.canvasRef.getContext("2d");
    this.canvasRef.onselectstart = () => false;
    this.onResize();
    requestAnimationFrame(this.tick);
    addEventListener("resize", this.onResize);
  }

  onResize() {
    this.canvasRef.removeAttribute("width");
    this.canvasRef.removeAttribute("height");
    this.canvasRef.setAttribute("width", this.canvasWrapperRef.clientWidth);
    this.canvasRef.setAttribute("height", this.canvasWrapperRef.clientHeight);
    this.gameState = initializeGameState(
      this.canvasWrapperRef.clientWidth,
      this.canvasWrapperRef.clientHeight,
      CanvasContainer.CELL_SIZE
    );
  }

  componentWillUnmount() {
    this.isRunning = false;
    removeEventListener("resize", this.onResize);
  }

  setCanvasRef(canvasRef) {
    this.canvasRef = canvasRef;
  }

  setCanvasWrapperRef(canvasWrapperRef) {
    this.canvasWrapperRef = canvasWrapperRef;
  }

  tick(currentTickTime) {
    if (!this.isRunning) {
      return;
    }
    requestAnimationFrame(this.tick);

    const elapsedTime = currentTickTime - this.state.previousTickTime;
    const secondsPerFrame = 1000 / this.props.fps;

    if (elapsedTime > secondsPerFrame) {
      this.setState({
        previousTickTime: currentTickTime - (elapsedTime % secondsPerFrame)
      });
      drawGameStateToCanvas(
        this.canvasRef,
        this.canvasContext,
        this.gameState,
        CanvasContainer.CELL_SIZE
      );
      updateGameState(this.gameState);
    }
  }

  addLiveCells(e) {
    const { gameState, canvasRef, canvasContext } = this;
    addLivingCells(
      gameState,
      CanvasContainer.CELL_SIZE,
      e.nativeEvent.touches && e.nativeEvent.touches.length > 0
        ? e.nativeEvent.touches[0]
        : e,
      canvasRef
    );
    requestAnimationFrame(() =>
      drawGameStateToCanvas(
        canvasRef,
        canvasContext,
        gameState,
        CanvasContainer.CELL_SIZE
      )
    );
  }

  onPointerDown(downEvent) {
    this.addLiveCells(downEvent);
    this.setState({ isAddingLiveCells: true });
  }

  onPointerUp() {
    this.setState({ isAddingLiveCells: false });
  }

  onPointerMove(moveEvent) {
    if (this.state.isAddingLiveCells) {
      this.addLiveCells(moveEvent);
    }
  }

  render() {
    return (
      <Canvas
        setCanvasRef={this.setCanvasRef}
        setCanvasWrapperRef={this.setCanvasWrapperRef}
        onPointerDown={this.onPointerDown}
        onPointerUp={this.onPointerUp}
        onPointerMove={this.onPointerMove}
      />
    );
  }
}

CanvasContainer.propTypes = propTypes;

export default CanvasContainer;
