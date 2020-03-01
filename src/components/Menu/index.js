import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import cx from "classnames";
import "assets/styles/blocks/menu.sass";

const propTypes = {
  currentPath: PropTypes.string.isRequired,
  currentLocale: PropTypes.string.isRequired,
  setEnglish: PropTypes.func.isRequired,
  setEstonian: PropTypes.func.isRequired,
  setRussian: PropTypes.func.isRequired
};

const Menu = ({
  currentPath,
  currentLocale,
  setEnglish,
  setEstonian,
  setRussian
}) => (
  <div className="menu">
    <div className="menu__links">
      {["", "about", "technical"].map(link => {
        const linkClasses = cx({
          "menu__links-item": true,
          "menu__links-item--active":
            (link === "" &&
              !currentPath.includes("about") &&
              !currentPath.includes("technical")) ||
            (link !== "" && currentPath.includes(link))
        });

        return (
          <Link key={link} className={linkClasses} to={link}>
            <FormattedMessage id={`menu.link.${link || "home"}`} />
          </Link>
        );
      })}
    </div>
    <div className="menu__languages">
      {[
        { locale: "en-EE", setter: setEnglish },
        { locale: "et-EE", setter: setEstonian },
        { locale: "ru-EE", setter: setRussian }
      ].map(({ locale, setter }) => {
        const languageClasses = cx({
          "menu__languages-item": true,
          [`menu__languages-item--${locale}`]: true,
          "menu__languages-item--selected": currentLocale === locale
        });

        return (
          <button
            key={locale}
            className={languageClasses}
            type="button"
            onClick={setter}
          />
        );
      })}
    </div>
  </div>
);

Menu.propTypes = propTypes;

export default Menu;
