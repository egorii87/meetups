import {
  Typography,
  TypographyComponent,
  ImageUploader,
  ImagePreviewMode,
  TextField,
  DateTimePicker,
  Button,
  ButtonVariant,
} from 'components';
import * as yup from 'yup';
import { Formik, Form } from 'formik';
import { useNavigate, useParams } from 'react-router';
import { useMeetupQuery } from 'hooks';
import { NotFoundPage } from 'pages';
import { ShortUser } from 'model';
import classNames from 'classnames';
import { updateMeetup } from 'api';

import styles from './EditMeetupPage.module.scss';

type EditFieldsValues = {
  image?: File | string;
  subject: string;
  start?: Date;
  finish?: Date | string;
  place?: string;
  author: ShortUser;
  excerpt?: string;
};

export const EditMeetupPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { meetup, isLoading } = useMeetupQuery(id!);

  if (isLoading || meetup === undefined) {
    return <div>Загрузка...</div>;
  }

  if (meetup === null) {
    return <NotFoundPage />;
  }

  const changeFormatDate = (date: string | undefined) => {
    if (!!date) {
      return new Date(date);
    }
  };

  return (
    <div>
      <Typography
        className={styles.header}
        component={TypographyComponent.Heading2}
      >
        Редактирование Митапа
      </Typography>
      <div className={styles.wrapper}>
        <Formik<EditFieldsValues>
          initialValues={{
            image: meetup.image,
            subject: meetup.subject,
            start: changeFormatDate(meetup.start),
            finish: changeFormatDate(meetup.finish),
            place: meetup.place,
            author: meetup.author,
            excerpt: meetup.excerpt,
          }}
          validationSchema={yup.object().shape({
            start: yup.date().typeError('Укажите дату и время начала митапа'),
            finish: yup.date().typeError('Укажите дату и время конца митапа'),
            place: yup.string().required(`Это поле обязательно`),
            image: yup
              .mixed()
              .required(
                'Пожалуйста, загрузите изображение формата .jpg, .jpeg или .png',
              ),
          })}
          onSubmit={(values: EditFieldsValues, { setSubmitting }) => {
            console.log(values);
            setSubmitting(false); // onSubmit is sync, so need to call this
          }}
          validate={(values) => {
            console.log(values.image);
          }}
        >
          {() => (
            <Form autoComplete="off" className={styles.formStyle}>
              <ImageUploader
                name="image"
                variant={ImagePreviewMode.Large}
                labelText="Фото"
              />
              <TextField
                name="subject"
                labelText="Название"
                multiline={false}
              />
              <ul className={styles.datePicker}>
                <li className={styles.datePickerChild}>
                  <DateTimePicker name="start" labelText="Начало" />
                </li>
                <li className={styles.datePickerChild}>
                  <DateTimePicker name="finish" labelText="Конец" />
                </li>
              </ul>
              <TextField
                name="place"
                labelText="Место проведения"
                multiline={false}
              />
              <TextField name="author" labelText="Спикер" multiline={false} />
              <TextField name="excerpt" labelText="Описание" multiline={true} />
            </Form>
          )}
        </Formik>
      </div>
      <div className={classNames(styles.dataContent, styles.actions)}>
        <Button
          variant={ButtonVariant.Default}
          onClick={() => navigate(-1)}
          style={{ width: '128px', marginRight: '60px' }}
        >
          Отмена
        </Button>
        <div className={styles.actionsWrapper}>
          <Button
            variant={ButtonVariant.Secondary}
            /* onClick={(e) => {
              console.log('work DRAFT')
              e.preventDefault();
              !!id && updateMeetup(id)
              navigate('/meetups/moderation');
              refresh()
            }} */
            style={{ width: '128px' }}
          >
            Предпросмотр
          </Button>
        </div>
        <div className={styles.actionsWrapper}>
          <Button variant={ButtonVariant.Primary} style={{ width: '128px' }}>
            Сохранить
          </Button>
        </div>
      </div>
    </div>
  );
};
