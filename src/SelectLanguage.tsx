import { Select, Option } from '@material-tailwind/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import './style/select_language.css';

function SelectLanguage() {
  const [language, setLanguage] = React.useState('en');

  const { i18n, t } = useTranslation();

  const languageHandler = (lang: string | undefined) => {
    if (typeof lang === 'string') {
      setLanguage(lang);
      i18n.changeLanguage(lang);
    }
  };

  const languages = [
    {
      value: 'English',
      key: 'en',
      iconPath: new URL(`./assets/locales/en.svg`, import.meta.url).href
    },
    {
      value: 'Español',
      key: 'es',
      iconPath: new URL(`./assets/locales/es.svg`, import.meta.url).href
    },
  ];

  return (
    <div className="div-select-language">
      <Select
        label={t('common.selectLanguage')}
        variant="standard"
        value={language}
        onChange={languageHandler}
        color="blue"
      >
        {languages.map(({ value, key, iconPath }) => (
          <Option value={key} className="language">
            <img src={iconPath} alt={value} className="language-icon" />
            {value}
          </Option>
        ))}
      </Select>
    </div>
  );
}

export default SelectLanguage;
