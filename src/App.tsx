import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { Header, meetupTabsLinks, meetupTabToDescriptor } from 'components';
import {
  MeetupPage,
  NotFoundPage,
  NewsPage,
  ViewMeetupPage,
  CreateMeetup,
  EditMeetupPage,
  ViewNewsPage,
  CreateNews,
  EditNewsPage,
} from 'pages';
import { meetupStore } from 'stores';
import { IntlProvider } from 'react-intl';
import languages_ru from './lang/ru.json';
import languages_en from './lang/en.json';

import styles from './App.module.scss';

const languages = {
  ru: languages_ru,
  en: languages_en,
};

function App() {
  (async () => {
    await meetupStore.init();
  })();

  const [language, setLanguage] = useState<string>('ru');

  const selectLanguage = () => {
    return (
      <div className="App-header">
        <div>
          <select
            value={language}
            onChange={(e) => {
              setLanguage(e.target.value);
            }}
          >
            <option value="ru">Русский</option>
            <option value="en">English</option>
          </select>
        </div>
      </div>
    );
  };

  return (
    <IntlProvider
      locale={navigator.language}
      messages={languages[language as keyof typeof languages]}
    >
      <BrowserRouter>
        <Header selectLang={selectLanguage} />
        <main className={styles.container}>
          <Routes>
            <Route path="/" element={<Navigate replace to="/meetups" />} />
            <Route path="meetups">
              <Route element={<MeetupPage />}>
                <Route
                  index
                  element={<Navigate replace to={meetupTabsLinks[0]} />}
                />
                {meetupTabsLinks.map((tabLink) => (
                  <Route
                    key={tabLink}
                    path={tabLink}
                    element={meetupTabToDescriptor[tabLink].component}
                  />
                ))}
              </Route>
              <Route path="create">
                <Route index element={<CreateMeetup />} />
              </Route>
              <Route path=":id">
                <Route index element={<ViewMeetupPage />} />
                <Route path="edit" element={<EditMeetupPage />} />
              </Route>
            </Route>
            <Route path="news">
              <Route index element={<NewsPage />} />
              <Route path="create" element={<CreateNews />} />
              <Route path=":id">
                <Route index element={<ViewNewsPage />} />
                <Route path="edit" element={<EditNewsPage />} />
              </Route>
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </BrowserRouter>
    </IntlProvider>
  );
}

export default App;
