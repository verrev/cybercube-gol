import React from "react";
import PropTypes from "prop-types";

const propTypes = {
  setCanvasRef: PropTypes.func.isRequired,
  canvasWidth: PropTypes.number.isRequired,
  canvasHeight: PropTypes.number.isRequired
};

const GameOfLife = ({ setCanvasRef, canvasWidth, canvasHeight }) => {
  return (
    <canvas ref={setCanvasRef} width={canvasWidth} height={canvasHeight} />
  );
};

GameOfLife.propTypes = propTypes;

export default GameOfLife;
