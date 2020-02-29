import React from "react";
import PropTypes from "prop-types";

const propTypes = {
  setCanvasRef: PropTypes.func.isRequired,
  canvasWidth: PropTypes.number.isRequired,
  canvasHeight: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired
};

const Canvas = ({ setCanvasRef, canvasWidth, canvasHeight, onClick }) => {
  return (
    <canvas
      ref={setCanvasRef}
      width={canvasWidth}
      height={canvasHeight}
      onClick={onClick}
    />
  );
};

Canvas.propTypes = propTypes;

export default Canvas;
