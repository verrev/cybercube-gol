import React from "react";
import PropTypes from "prop-types";
import "assets/styles/blocks/game-board.sass";

const propTypes = {
  setCanvasRef: PropTypes.func.isRequired,
  canvasWidth: PropTypes.number.isRequired,
  canvasHeight: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired
};

const Canvas = ({ setCanvasRef, canvasWidth, canvasHeight, onClick }) => (
  <div className="game-board">
    <canvas
      className="game-board__canvas"
      ref={setCanvasRef}
      width={canvasWidth}
      height={canvasHeight}
      onClick={onClick}
    />
  </div>
);

Canvas.propTypes = propTypes;

export default Canvas;
