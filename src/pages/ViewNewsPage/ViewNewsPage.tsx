import { useLocation, useNavigate, useParams } from 'react-router';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

import {
  Button,
  ButtonVariant,
  Typography,
  TypographyComponent,
  Loader,
} from 'components';
import { useNewsArticleQuery } from 'hooks';
import { NotFoundPage } from 'pages';

import styles from './ViewNewsPage.module.scss';
import defaultImage from 'assets/images/default-image.jpg';

export const ViewNewsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { newsArticle, isLoading } = useNewsArticleQuery(id!);

  const handleBack = (): void => navigate(-1);
  const handleEdit = (): void => navigate(pathname + '/edit');

  if (isLoading || newsArticle === undefined) {
    return <Loader />;
  }

  if (newsArticle === null) {
    return <NotFoundPage />;
  }

  const { title, text } = newsArticle;

  const renderImage = (): JSX.Element => {
    return (
      <figure className={classNames(styles.section, styles.imageWrapper)}>
        <img
          className={styles.image}
          src={id && (localStorage.getItem(id) || defaultImage)}
          alt="Изображение новости"
        />
      </figure>
    );
  };

  const renderContent = (): JSX.Element => (
    <div className={classNames(styles.textSection, styles.main)}>
      <Typography
        className={styles.title}
        component={TypographyComponent.Heading2}
      >
        {title}
      </Typography>
      <Typography
        className={styles.text}
        component={TypographyComponent.Paragraph}
      >
        {text}
      </Typography>
    </div>
  );

  const renderActions = (): JSX.Element => {
    return (
      <div className={classNames(styles.textSection, styles.actions)}>
        <Button variant={ButtonVariant.Default} onClick={handleBack}>
          <FormattedMessage id="buttons.back" defaultMessage="Назад" />
        </Button>
        <div className={styles.actionGroup}>
          <Button variant={ButtonVariant.Secondary} onClick={handleEdit}>
            <FormattedMessage
              id="buttons.edit"
              defaultMessage="Редактировать"
            />
          </Button>
        </div>
      </div>
    );
  };

  return (
    <section className={styles.container}>
      <Typography
        className={styles.heading}
        component={TypographyComponent.Heading1}
      >
        <FormattedMessage
          id="news.previewNews.header"
          defaultMessage="Просмотр новости"
        />
      </Typography>
      <div className={styles.contentWrapper}>
        {renderImage()}
        {renderContent()}
        {renderActions()}
      </div>
    </section>
  );
};
