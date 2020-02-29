import React, { useState, useCallback } from "react";
import CanvasContainer from "containers/CanvasContainer";
import SettingsContainer from "containers/SettingsContainer";
import initialState from "consts/initialState";

const GameOfLifeContainer = () => {
  const [canvasWidth, setCanvasWidth] = useState(initialState.canvasWidth);
  const [canvasHeight, setCanvasHeight] = useState(initialState.canvasHeight);
  const [cellSize, setCellSize] = useState(initialState.cellSize);
  const [fps, setFps] = useState(initialState.fps);

  const onSubmit = useCallback((values, { setSubmitting }) => {
    setCanvasWidth(values.canvasWidth);
    setCanvasHeight(values.canvasHeight);
    setCellSize(values.cellSize);
    setFps(values.fps);
    setSubmitting(false);
  }, []);

  return (
    <>
      <CanvasContainer
        canvasWidth={canvasWidth}
        canvasHeight={canvasHeight}
        cellSize={cellSize}
        fps={fps}
      />
      <SettingsContainer onSubmit={onSubmit} initialState={initialState} />
    </>
  );
};

export default GameOfLifeContainer;
