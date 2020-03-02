import React, { useState } from "react";
import CanvasContainer from "containers/CanvasContainer";
import SettingsContainer from "containers/SettingsContainer";

const GameOfLifeContainer = () => {
  const [fps, setFps] = useState(1);

  return (
    <>
      <CanvasContainer fps={fps} />
      <SettingsContainer fps={fps} setFps={setFps} />
    </>
  );
};

export default GameOfLifeContainer;
