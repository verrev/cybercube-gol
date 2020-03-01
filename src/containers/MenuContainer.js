import React, { useCallback } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import Menu from "components/Menu";

const propTypes = {
  setLocale: PropTypes.func.isRequired
};

const MenuContainer = ({ setLocale }) => {
  const { pathname } = useLocation();
  const { locale } = useIntl();
  const setEnglish = useCallback(() => setLocale("en-EE"), []);
  const setEstonian = useCallback(() => setLocale("et-EE"), []);
  const setRussian = useCallback(() => setLocale("ru-EE"), []);

  return (
    <Menu
      currentPath={pathname}
      currentLocale={locale}
      setEnglish={setEnglish}
      setEstonian={setEstonian}
      setRussian={setRussian}
    />
  );
};

MenuContainer.propTypes = propTypes;

export default MenuContainer;
