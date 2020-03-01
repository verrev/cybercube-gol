import React, { useCallback } from "react";
import PropTypes from "prop-types";
import Settings from "components/Settings";

const propTypes = {
  fps: PropTypes.number.isRequired,
  setFps: PropTypes.func.isRequired
};

const SettingsContainer = ({ fps, setFps }) => {
  const onChange = useCallback(
    ({ target: { value } }) => setFps(Number.parseInt(value, 10)),
    [setFps]
  );

  return <Settings fps={fps} onChange={onChange} />;
};

SettingsContainer.propTypes = propTypes;

export default SettingsContainer;
