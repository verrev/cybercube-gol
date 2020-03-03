import React from "react";
import PropTypes from "prop-types";
import "assets/styles/blocks/canvas.sass";

const propTypes = {
  setCanvasRef: PropTypes.func.isRequired,
  setCanvasWrapperRef: PropTypes.func.isRequired,
  onPointerDown: PropTypes.func.isRequired,
  onPointerUp: PropTypes.func.isRequired,
  onPointerMove: PropTypes.func.isRequired
};

const Canvas = ({
  setCanvasRef,
  setCanvasWrapperRef,
  onPointerDown,
  onPointerUp,
  onPointerMove
}) => (
  <div className="canvas" ref={setCanvasWrapperRef}>
    <canvas
      className="canvas__element"
      ref={setCanvasRef}
      onMouseDown={onPointerDown}
      onMouseMove={onPointerMove}
      onMouseUp={onPointerUp}
      onTouchStart={onPointerDown}
      onTouchMove={onPointerMove}
      onTouchEnd={onPointerUp}
    />
  </div>
);

Canvas.propTypes = propTypes;

export default Canvas;
