import React from "react";
import PropTypes from "prop-types";
import "assets/styles/blocks/canvas.sass";

const propTypes = {
  setCanvasRef: PropTypes.func.isRequired,
  setCanvasWrapperRef: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired
};

const Canvas = ({ setCanvasRef, setCanvasWrapperRef, onClick }) => (
  <div className="canvas" ref={setCanvasWrapperRef}>
    <canvas className="canvas__element" ref={setCanvasRef} onClick={onClick} />
  </div>
);

Canvas.propTypes = propTypes;

export default Canvas;
