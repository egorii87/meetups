import {
  Button,
  ButtonVariant,
  NewsCard,
  Typography,
  TypographyComponent,
} from 'components';
import { News } from 'model';
import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { newsStore } from 'stores';

import styles from './NewsPage.module.scss';

export const NewsPage = () => {
  const [news, setNews] = useState<News[]>([]);

  const navigate = useNavigate();

  const openCreateNewsPage = () => navigate('/news/create');

  useEffect(() => {
    const fetchNews = async () => {
      await newsStore.init();
      return setNews(newsStore.getAllNews);
    };
    fetchNews();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Typography
          component={TypographyComponent.Heading1}
          className={styles.heading}
        >
          <FormattedMessage id="news.header" defaultMessage="Новости" />
        </Typography>
        <Button variant={ButtonVariant.Secondary} onClick={openCreateNewsPage}>
          <FormattedMessage
            id="buttons.createNews"
            defaultMessage="+ Создать Новость"
          />
        </Button>
      </div>
      <ul className={styles.newsList}>
        {news.map((article: News) => (
          <li key={article.id} className={styles.newsItem}>
            <NavLink to={`/news/${article.id}`}>
              <NewsCard news={article} />
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};
