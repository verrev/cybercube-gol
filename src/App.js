import React, { useState } from "react";
import { IntlProvider } from "react-intl";
import MenuContainer from "containers/MenuContainer";
import GameOfLifeContainer from "containers/GameOfLifeContainer";
import messages from "assets/locales/messages.json";
import "assets/index.sass";

const App = () => {
  const [locale, setLocale] = useState(navigator.language);

  return (
    <IntlProvider
      locale={locale}
      messages={messages[locale] || messages["en-EE"]}
    >
      <MenuContainer setLocale={setLocale} />
      <GameOfLifeContainer />
    </IntlProvider>
  );
};

export default App;
