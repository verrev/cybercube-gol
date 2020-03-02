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
    this.state = {
      previousTickTime: performance.now()
    };

    this.setCanvasRef = this.setCanvasRef.bind(this);
    this.setCanvasWrapperRef = this.setCanvasWrapperRef.bind(this);
    this.tick = this.tick.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onResize = this.onResize.bind(this);
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
    this.tick = () => {};
  }

  setCanvasRef(canvasRef) {
    this.canvasRef = canvasRef;
  }

  setCanvasWrapperRef(canvasWrapperRef) {
    this.canvasWrapperRef = canvasWrapperRef;
  }

  tick(currentTickTime) {
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

  onClick(clickEvent) {
    const { gameState, canvasRef, canvasContext } = this;
    addLivingCells(gameState, CanvasContainer.CELL_SIZE, clickEvent, canvasRef);
    requestAnimationFrame(() =>
      drawGameStateToCanvas(
        canvasRef,
        canvasContext,
        gameState,
        CanvasContainer.CELL_SIZE
      )
    );
  }

  render() {
    return (
      <Canvas
        setCanvasRef={this.setCanvasRef}
        setCanvasWrapperRef={this.setCanvasWrapperRef}
        onClick={this.onClick}
      />
    );
  }
}

CanvasContainer.propTypes = propTypes;

export default CanvasContainer;
