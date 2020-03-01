import React, { useState, useCallback, useEffect } from "react";
import CanvasContainer from "containers/CanvasContainer";
import SettingsContainer from "containers/SettingsContainer";

const GameOfLifeContainer = () => {
  const [fps, setFps] = useState(1);

  const [screenDimensions, setScreenDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  const onResize = useCallback(
    ({ target: { innerWidth: width, innerHeight: height } }) =>
      setScreenDimensions({ width, height }),
    [setScreenDimensions]
  );

  useEffect(() => {
    addEventListener("resize", onResize);
    return () => removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      <CanvasContainer screenDimensions={screenDimensions} fps={fps} />
      <SettingsContainer fps={fps} setFps={setFps} />
    </>
  );
};

export default GameOfLifeContainer;
