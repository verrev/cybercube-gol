import React from "react";
import PropTypes from "prop-types";
import { Formik } from "formik";
import Settings from "components/Settings";
import {
  isValidDimension,
  isValidCellSize,
  isValidFps
} from "utils/validators";

const propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialState: PropTypes.object.isRequired
};

const SettingsContainer = ({ onSubmit, initialState }) => (
  <Formik
    initialValues={initialState}
    validate={({ canvasWidth, canvasHeight, cellSize, fps }) => {
      const errors = {};
      if (!isValidDimension(canvasWidth)) {
        errors.canvasWidth = "errors.dimension.invalid";
      }
      if (!isValidDimension(canvasHeight)) {
        errors.canvasHeight = "errors.dimension.invalid";
      }
      if (!isValidCellSize(cellSize, canvasWidth, canvasHeight)) {
        errors.cellSize = "errors.cellsize.invalid";
      }
      if (!isValidFps(fps)) {
        errors.fps = "errors.fps.invalid";
      }
      return errors;
    }}
    onSubmit={onSubmit}
  >
    <Settings initialState={initialState} />
  </Formik>
);

SettingsContainer.propTypes = propTypes;

export default SettingsContainer;
