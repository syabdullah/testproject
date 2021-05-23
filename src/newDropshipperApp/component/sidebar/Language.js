// Libs
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

// Components
import { Container, SelectedLanguage, Title } from "./LanguageStyle";
import { Dropdown } from "../../spocketUI";

// Hooks
import { useTranslation } from "react-i18next";

// Actions
import { updatePersonalization } from "../../module/store/personalization";

// Images
import iconGlobe from "../../images/icon-globe.svg";
import arrowDown from "../../images/arrow-down-sign-to-navigate.svg";

const Language = ({ userLanguage }) => {
  const { i18n, t } = useTranslation();
  const [clickedLanguage, setClickedLanguage] = useState("");
  const codeToHumanReadable = {
    da: "Danish",
    de: "German",
    en: "English",
    es: "Spanish",
    fr: "French",
    it: "Italian",
    ja: "Japanese",
    ko: "Korean",
    nl: "Dutch",
    pt: "Portuguese",
    tr: "Turkish",
    zh: "Chinese"
  };
  const languagesArray = Object.keys(codeToHumanReadable); // ["da", "de", ...]

  useEffect(
    () => {
      if (userLanguage) {
        setLanguage(userLanguage);
        localStorage.setItem("language", userLanguage);
      } else {
        setClickedLanguage(localStorage.getItem("language") || i18n.language);
      }
    },
    [userLanguage]
  );

  /**
   * @param  {String} language
   * Changing the language and local state
   */
  const setLanguage = language => {
    return i18n.changeLanguage(language).then(() => {
      setClickedLanguage(language);
    });
  };

  /**
   * @param  {Object} language IETF language format
   * https://gist.github.com/traysr/2001377
   */
  const updateOnClickLanguage = language => {
    updatePersonalization({ language });
    localStorage.setItem("language", language);
    setLanguage(language);
  };

  const getUserLanguage = () => {
    if (clickedLanguage) {
      return codeToHumanReadable[clickedLanguage];
    } else {
      return codeToHumanReadable[userLanguage] || "loading...";
    }
  };

  return (
    <Container>
      <Dropdown position="top">
        <Dropdown.Trigger>
          <SelectedLanguage>
            <span>
              <img src={iconGlobe} alt="globe" />
              {getUserLanguage()}
            </span>
            <img src={arrowDown} alt="arrow down" />
          </SelectedLanguage>
        </Dropdown.Trigger>
        <Dropdown.Content>
          <Title>{t("Language.Title")}</Title>
          {languagesArray.map((lang, index) => (
            <Dropdown.Item
              key={index}
              checked={clickedLanguage === lang}
              onClick={() => updateOnClickLanguage(lang)}
            >
              {codeToHumanReadable[lang]}
            </Dropdown.Item>
          ))}
        </Dropdown.Content>
      </Dropdown>
    </Container>
  );
};

function mapStateToProps(state) {
  return {
    userLanguage: state.settings.dropshipperData.language
  };
}

export default connect(mapStateToProps)(Language);



// WEBPACK FOOTER //
// ./src/newDropshipperApp/component/sidebar/Language.js