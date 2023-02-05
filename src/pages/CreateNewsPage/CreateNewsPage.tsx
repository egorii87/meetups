import {
  Typography,
  TypographyComponent,
  ImageUploader,
  ImagePreviewMode,
  Button,
  ButtonVariant,
} from 'components';
import { NewNews } from 'model';
import { TextField } from 'components';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { newsStore } from 'stores';

import styles from './CreateNewsPage.module.scss';

const newNews: NewNews = {
  title: '',
  text: '',
  image: '',
};

const createOneNews = () => newsStore.create(newNews);

export const CreateNews = () => {
  const navigate = useNavigate();

  return (
    <div className="">
      <div>
        <Typography
          className={styles.header}
          component={TypographyComponent.Heading1}
        >
          Создание Новости
        </Typography>
      </div>
      <div className={styles.inputForm}>
        <Formik<NewNews>
          initialValues={{
            title: '',
            text: '',
            image: '',
          }}
          validationSchema={yup.object().shape({
            title: yup.string().required(`Это поле обязательно`),
            text: yup.string().required(`Это поле обязательно`),
            image: yup.string().required(`Это поле обязательно`),
          })}
          onSubmit={(values: NewNews, { setSubmitting }) => {
            console.log(values);
          }}
          validate={(values) => {
            if (!!values.title && !!values.text && !!values.image) {
              newNews.title = values.title;
              newNews.text = values.text;
              newNews.image = values.image;
              console.log(newNews);
            }
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
          style={{ width: '152px' }}
          onClick={() => navigate(-1)}
        >
          Назад
        </Button>
        <div className={styles.actionsWrapper}>
          <Button
            variant={ButtonVariant.Primary}
            style={{ width: '152px' }}
            onClick={async () => {
              await createOneNews();
              navigate(-1);
            }}
          >
            Создать
          </Button>
        </div>
      </div>
    </div>
  );
};
