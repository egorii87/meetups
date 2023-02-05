import React from 'react';
import ReactDOM from 'react-dom/client';
import 'style/index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import messages_ru from './lang/ru.json';
import messages_en from './lang/en.json';
import { IntlProvider } from 'react-intl';

const messages = {
  ru: messages_ru,
  en: messages_en,
};

//let language = navigator.language.split(/[-_]/)[0];

const language = 'en';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <IntlProvider locale={navigator.language} messages={messages[language]}>
      <App />
    </IntlProvider>
  </React.StrictMode>,
);

reportWebVitals();
