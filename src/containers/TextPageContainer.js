import React from "react";
import PropTypes from "prop-types";
import TextWrapper from "components/TextWrapper";

const propTypes = {
  pageName: PropTypes.string.isRequired
};

const TextPageContainer = ({ pageName }) => (
  <TextWrapper textId={`${pageName}.content`} />
);

TextPageContainer.propTypes = propTypes;

export default TextPageContainer;
