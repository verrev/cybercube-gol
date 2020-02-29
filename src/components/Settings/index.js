import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Form, Field, ErrorMessage } from "formik";
import { FormattedMessage } from "react-intl";

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
      <FormattedMessage id="settings.apply" />
    </button>
  </Form>
);

Settings.propTypes = propTypes;

export default Settings;
