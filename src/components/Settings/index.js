import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Form, Field, ErrorMessage } from "formik";

const propTypes = {
  isSubmitting: PropTypes.bool,
  initialState: PropTypes.object.isRequired
};

const Settings = ({ isSubmitting, initialState }) => (
  <Form>
    {Object.keys(initialState).map(fieldName => (
      <Fragment key={fieldName}>
        <Field type="number" name={fieldName} />
        <ErrorMessage name={fieldName} component="div" />
      </Fragment>
    ))}
    <button type="submit" disabled={isSubmitting}>
      Apply
    </button>
  </Form>
);

Settings.propTypes = propTypes;

export default Settings;
