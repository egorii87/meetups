import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

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

import styles from './App.module.scss';

function App() {
  (async () => {
    await meetupStore.init();
  })();

  return (
    <BrowserRouter>
      <Header />
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
  );
}

export default App;
