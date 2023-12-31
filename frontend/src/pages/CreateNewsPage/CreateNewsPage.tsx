import {
  Typography,
  TypographyComponent,
  ImageUploader,
  ImagePreviewMode,
  Button,
  ButtonVariant,
  TextField,
  NotificationVariant,
  notification,
} from 'components';
import { FormattedMessage } from 'react-intl';
import { NewNews } from 'model';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { newsStore } from 'stores';
import { dataCy } from 'helpers';

import styles from './CreateNewsPage.module.scss';

const newNews: NewNews = {
  title: '',
  text: '',
  image: undefined,
};

let image64: string;

async function createOneNews() {
  let createdNews = await newsStore.create(newNews);
  localStorage.setItem(createdNews.id, image64);
  notification(NotificationVariant.Success, 'Новость успешно создана');
}

export const CreateNews = () => {
  const navigate = useNavigate();

  return (
    <div className="">
      <div>
        <Typography
          className={styles.header}
          component={TypographyComponent.Heading1}
        >
          <FormattedMessage
            id="news.createNews.header"
            defaultMessage="Создание Новости"
          />
        </Typography>
      </div>
      <div className={styles.inputForm}>
        <Formik<NewNews>
          initialValues={{
            title: '',
            text: '',
            image: undefined,
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
            }
            if (!!values.image) {
              const fr = new FileReader();
              fr.readAsDataURL(values.image);
              fr.addEventListener('load', () => {
                const res = fr.result;
                if (typeof res === 'string') {
                  image64 = res;
                }
              });
            }
          }}
        >
          {() => {
            return (
              <Form autoComplete="off" className={styles.formStyle}>
                <TextField
                  name="title"
                  labelText={
                    <FormattedMessage
                      id="fieldsName.heading"
                      defaultMessage="Заголовок"
                    />
                  }
                  multiline={false}
                />
                <TextField
                  name="text"
                  labelText={
                    <FormattedMessage
                      id="fieldsName.text"
                      defaultMessage="Текст"
                    />
                  }
                  multiline={true}
                />
                <ImageUploader
                  name="image"
                  labelText={
                    <FormattedMessage
                      id="fieldsName.image"
                      defaultMessage="Изображение"
                    />
                  }
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
          className={styles.button}
          onClick={() => navigate(-1)}
        >
          <FormattedMessage id="buttons.back" defaultMessage="Назад" />
        </Button>
        <div className={styles.actionsWrapper}>
          <Button
            variant={ButtonVariant.Primary}
            className={styles.button}
            onClick={async () => {
              await createOneNews();
              navigate(-1);
            }}
            {...dataCy('submitNews')}
          >
            <FormattedMessage id="buttons.create" defaultMessage="Создать" />
          </Button>
        </div>
      </div>
    </div>
  );
};
