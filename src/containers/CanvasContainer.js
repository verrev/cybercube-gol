import React, { Component, createRef } from "react";
import PropTypes from "prop-types";
import GameBoard from "components/GameBoard";
import {
  initializeGameState,
  addLivingCells,
  updateGameState,
  drawGameStateToCanvas,
  getCanvasDimensions
} from "utils/gameOfLifeHelpers";

const propTypes = {
  fps: PropTypes.number.isRequired,
  screenDimensions: PropTypes.object.isRequired
};

class GameBoardContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...getCanvasDimensions(props.screenDimensions),
      cellSize: 10
    };

    this.canvasRef = createRef();
    this.canvasContext = null;
    this.previousTickTime = performance.now();
    this.isRunning = true;

    this.setCanvasRef = this.setCanvasRef.bind(this);
    this.tick = this.tick.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    this.gameState = initializeGameState(this.state);
    requestAnimationFrame(this.tick);
  }

  componentWillUnmount() {
    this.isRunning = false;
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      canvasWidth: prevCanvasWidth,
      canvasHeight: prevCanvasHeight,
      cellSize: prevCellSize
    } = prevState;
    const { canvasWidth, canvasHeight, cellSize } = this.state;
    const { screenDimensions: prevScreenDimensions } = prevProps;
    const { screenDimensions } = this.props;

    if (prevScreenDimensions !== screenDimensions) {
      this.setState({
        ...getCanvasDimensions(screenDimensions)
      });
    }

    if (
      prevCanvasWidth !== canvasWidth ||
      prevCanvasHeight !== canvasHeight ||
      prevCellSize !== cellSize
    ) {
      this.initializeCanvas();
      this.gameState = initializeGameState(this.state);
    }
  }

  setCanvasRef(canvasRef) {
    if (!this.isRunning) {
      return;
    }
    this.canvasRef = canvasRef;
    this.initializeCanvas();
  }

  initializeCanvas() {
    this.canvasContext = this.canvasRef.getContext("2d");
    this.canvasContext.setTransform(1, 0, 0, 1, 0, 0);
    this.canvasContext.scale(2, 2);
    this.canvasRef.style.width = `${this.state.canvasWidth}px`;
    this.canvasRef.style.height = `${this.state.canvasHeight}px`;
    this.canvasRef.onselectstart = () => false;
  }

  tick(currentTickTime) {
    if (this.isRunning) {
      requestAnimationFrame(this.tick);
    }
    const elapsedTime = currentTickTime - this.previousTickTime;
    const secondsPerFrame = 1000 / this.props.fps;

    if (elapsedTime > secondsPerFrame) {
      this.previousTickTime = currentTickTime - (elapsedTime % secondsPerFrame);
      drawGameStateToCanvas(
        this.canvasRef,
        this.canvasContext,
        this.gameState,
        this.state.cellSize
      );
      updateGameState(this.gameState);
    }
  }

  onClick(clickEvent) {
    const {
      gameState,
      canvasRef,
      canvasContext,
      state: { cellSize }
    } = this;
    addLivingCells(gameState, cellSize, clickEvent, canvasRef);
    requestAnimationFrame(() =>
      drawGameStateToCanvas(canvasRef, canvasContext, gameState, cellSize)
    );
  }

  render() {
    return (
      <GameBoard
        setCanvasRef={this.setCanvasRef}
        canvasWidth={this.state.canvasWidth * 2}
        canvasHeight={this.state.canvasHeight * 2}
        onClick={this.onClick}
      />
    );
  }
}

GameBoardContainer.propTypes = propTypes;

export default GameBoardContainer;
