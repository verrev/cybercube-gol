import React from "react";
import PropTypes from "prop-types";

const propTypes = {
  setLocale: PropTypes.func.isRequired
};

const MenuContainer = ({ setLocale }) => {
  return (
    <div>
      <button type="button" onClick={() => setLocale("en-EE")}>
        English
      </button>
      <button type="button" onClick={() => setLocale("et-EE")}>
        Eesti
      </button>
      <button type="button" onClick={() => setLocale("ru-EE")}>
        Pусский
      </button>
    </div>
  );
};

MenuContainer.propTypes = propTypes;

export default MenuContainer;
