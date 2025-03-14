import React from 'react';
import { useTranslation } from 'react-i18next';

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
      <button
        onClick={() => changeLanguage('en')}
        style={{ marginRight: '10px', padding: '5px 10px' }}
      >
        EN
      </button>
      <button
        onClick={() => changeLanguage('es')}
        style={{ padding: '5px 10px' }}
      >
        ES
      </button>
    </div>
  );
}

export default LanguageSwitcher; 