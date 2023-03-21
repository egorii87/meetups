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
  LoginPage,
  LogoutPage,
} from 'pages';
import { meetupStore, userStore } from 'stores';
import { IntlProvider } from 'react-intl';
import { ToastContainer } from 'react-toastify';
import { LanguageSelector } from 'lang/LanguageSelector';
import { PrivateRoutes, TypePermission } from 'helpers';

import styles from './App.module.scss';
import 'react-toastify/dist/ReactToastify.css';
import languages_ru from './lang/ru.json';
import languages_en from './lang/en.json';
import languages_ua from './lang/ua.json';

function App() {
  (async () => {
    await meetupStore.init();
    await userStore.checkLogin();
  })();

  const languages = {
    ru: languages_ru,
    en: languages_en,
    ua: languages_ua,
  };

  const [language, setLanguage] = useState<string>(
    localStorage.getItem('lang') || 'ru',
  );

  return (
    <IntlProvider
      locale={navigator.language}
      messages={languages[language as keyof typeof languages]}
    >
      <BrowserRouter>
        <Header
          LanguageSelector={
            <LanguageSelector selectLang={setLanguage} lang={language} />
          }
        />
        <main className={styles.container}>
          <Routes>
            <Route
              element={
                <PrivateRoutes types={TypePermission.NOTAUTHENTICATED} />
              }
            >
              <Route path="login">
                <Route index element={<LoginPage />} />
              </Route>
            </Route>
            <Route path="logout">
              <Route index element={<LogoutPage />} />
            </Route>
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
                <Route
                  element={
                    <PrivateRoutes types={TypePermission.AUTHENTICATED} />
                  }
                >
                  <Route index element={<CreateMeetup />} />
                </Route>
              </Route>
              <Route path=":id">
                <Route index element={<ViewMeetupPage />} />
                <Route
                  element={<PrivateRoutes types={TypePermission.EMPLOYEE} />}
                >
                  <Route path="edit" element={<EditMeetupPage />} />
                </Route>
              </Route>
            </Route>
            <Route path="news">
              <Route index element={<NewsPage />} />
              <Route element={<PrivateRoutes types={TypePermission.CHIEF} />}>
                <Route path="create" element={<CreateNews />} />
              </Route>
              <Route path=":id">
                <Route index element={<ViewNewsPage />} />
                <Route element={<PrivateRoutes types={TypePermission.CHIEF} />}>
                  <Route path="edit" element={<EditNewsPage />} />
                </Route>
              </Route>
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </BrowserRouter>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
        theme="light"
      />
    </IntlProvider>
  );
}

export default App;
