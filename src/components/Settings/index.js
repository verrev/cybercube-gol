import React from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import "assets/styles/blocks/settings.sass";
import "assets/styles/blocks/override-slider.sass";

const propTypes = {
  fps: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
};

const Settings = ({ fps, onChange }) => (
  <div className="settings override-slider">
    <div className="settings__fps-label">
      <FormattedMessage id="fps.label" />
    </div>
    <input
      className="settings__fps-slider"
      type="range"
      min="1"
      max="100"
      value={fps}
      onChange={onChange}
    />
  </div>
);

Settings.propTypes = propTypes;

export default Settings;
