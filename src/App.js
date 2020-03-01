import React, { useState, useEffect } from "react";
import { IntlProvider } from "react-intl";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MenuContainer from "containers/MenuContainer";
import TextPageContainer from "containers/TextPageContainer";
import GameOfLifeContainer from "containers/GameOfLifeContainer";
import messages from "assets/locales/messages.json";
import "assets/index.sass";

const App = () => {
  const [locale, setLocale] = useState(navigator.language);
  const availableLocales = Object.keys(messages);
  useEffect(() => {
    if (!availableLocales.includes(locale)) {
      setLocale("en-EE");
    }
  }, []);

  return (
    <IntlProvider
      locale={availableLocales.includes(locale) ? locale : "en-EE"}
      messages={messages[locale] || messages["en-EE"]}
    >
      <Router>
        <MenuContainer setLocale={setLocale} />
        <Switch>
          <Route path="/about" exact>
            <TextPageContainer pageName="about" />
          </Route>
          <Route path="/technical" exact>
            <TextPageContainer pageName="technical" />
          </Route>
          <Route>
            <GameOfLifeContainer />
          </Route>
        </Switch>
      </Router>
    </IntlProvider>
  );
};

export default App;
