import React from "react";
import PropTypes from "prop-types";
import { FormattedHTMLMessage } from "react-intl";
import "assets/styles/blocks/text-wrapper.sass";

const propTypes = {
  textId: PropTypes.string.isRequired
};

const TextWrapper = ({ textId }) => (
  <div className="text-wrapper">
    <div className="text-wrapper__content">
      <FormattedHTMLMessage id={textId} />
    </div>
  </div>
);

TextWrapper.propTypes = propTypes;

export default TextWrapper;
