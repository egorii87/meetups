import {
  Typography,
  TypographyComponent,
  ImageUploader,
  ImagePreviewMode,
  TextField,
  Button,
  ButtonVariant,
} from 'components';
import * as yup from 'yup';
import { Formik, Form } from 'formik';
import { useNavigate, useParams } from 'react-router';
import { useNewsArticleQuery } from 'hooks';
import { NotFoundPage } from 'pages';
import classNames from 'classnames';
import { newsStore } from 'stores';

import styles from './EditNewsPage.module.scss';

type EditNews = {
  title: string;
  text: string;
  image: string;
};

export const EditNewsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { newsArticle, isLoading } = useNewsArticleQuery(id!);

  let update = async () => {
    !!newsArticle && (await newsStore.update(newsArticle));
    navigate('/news');
  };

  if (isLoading || newsArticle === undefined) {
    return <div>Загрузка...</div>;
  }

  if (newsArticle === null) {
    return <NotFoundPage />;
  }

  return (
    <div className="">
      <Typography
        className={styles.header}
        component={TypographyComponent.Heading2}
      >
        Редактирование Митапа
      </Typography>
      <div className={styles.wrapper}>
        <Formik<EditNews>
          initialValues={{
            title: newsArticle.title,
            text: newsArticle.text,
            image: newsArticle.image,
          }}
          validationSchema={yup.object().shape({
            title: yup.string().required(`Это поле обязательно`),
            text: yup.string().required(`Это поле обязательно`),
          })}
          onSubmit={(values: EditNews, { setSubmitting }) => {
            console.log(values);
            setSubmitting(false); // onSubmit is sync, so need to call this
          }}
          validate={(values) => {
            newsArticle.title = values.title;
            newsArticle.text = values.text;
            newsArticle.image = values.image;
            console.log(values.image);
          }}
        >
          {() => {
            return (
              <Form autoComplete="off" className={styles.formStyle}>
                <TextField
                  name="title"
                  labelText="Заголовок"
                  multiline={false}
                />
                <TextField name="text" labelText="Текст" multiline={true} />
                <ImageUploader
                  name="image"
                  labelText="Изображение"
                  variant={ImagePreviewMode.Large}
                />
              </Form>
            );
          }}
        </Formik>
      </div>
      <div className={classNames(styles.buttonContent, styles.actions)}>
        <Button
          variant={ButtonVariant.Default}
          onClick={() => navigate(-1)}
          style={{ width: '152px', marginRight: '60px' }}
        >
          Назад
        </Button>
        <div className={styles.actionsWrapper}>
          <Button
            variant={ButtonVariant.Primary}
            style={{ width: '152px' }}
            onClick={update}
          >
            Сохранить
          </Button>
        </div>
      </div>
    </div>
  );
};
