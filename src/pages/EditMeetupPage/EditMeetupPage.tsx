import {
  Typography,
  TypographyComponent,
  ImageUploader,
  ImagePreviewMode,
  TextField,
  DateTimePicker,
  Button,
  ButtonVariant,
  UserPreview,
} from 'components';
import * as yup from 'yup';
import { Formik, Form } from 'formik';
import { useNavigate, useParams } from 'react-router';
import { useMeetupQuery } from 'hooks';
import { NotFoundPage } from 'pages';
import classNames from 'classnames';
import { meetupStore } from 'stores';
import { ShortUser, MeetupStatus } from 'model';
import { useState } from 'react';
import { parseDateString } from 'helpers';

import styles from './EditMeetupPage.module.scss';
import defaultImage from 'assets/images/default-image.jpg';
import calendar from './assets/calendar.svg';
import clock from './assets/clock.svg';
import pin from './assets/pin.svg';

type EditFieldsValues = {
  image?: File;
  subject: string;
  start?: Date;
  finish?: Date;
  place?: string;
  author: string;
  excerpt?: string;
};

export const EditMeetupPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { meetup, isLoading } = useMeetupQuery(id!);
  const [hiddenPreview, setHiddenPreview] = useState(true);

  let update = async () => {
    !!meetup && (await meetupStore.edit(meetup));
    navigate('/meetups');
  };

  const newAthorMeetup: ShortUser = {
    id: '',
    name: '',
    surname: '',
  };

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

  const renderTimePlace = () => {
    let date, time;

    if (meetup.start) {
      const { formattedWeekdayLong, formattedDate, formattedTime } =
        parseDateString(meetup.start);

      date = `${formattedWeekdayLong}, ${formattedDate}`;
      time = `${formattedTime}`;

      if (meetup.finish) {
        const { formattedTime } = parseDateString(meetup.finish);

        time = time + ` — ${formattedTime}`;
      }
    }

    return (
      <div className={styles.data}>
        <Typography
          component={TypographyComponent.Span}
          className={styles.dataName}
        >
          Время и место проведения
        </Typography>
        <div className={styles.dataContent}>
          <div className={styles.timePlaceInfo}>
            <div className={styles.info}>
              <img className={styles.image} src={calendar} alt="Дата" />
              <Typography component={TypographyComponent.Span}>
                {date || '—'}
              </Typography>
            </div>
            <div className={styles.info}>
              <img className={styles.image} src={clock} alt="Время" />
              <Typography component={TypographyComponent.Span}>
                {time || '—'}
              </Typography>
            </div>
            <div className={styles.info}>
              <img className={styles.image} src={pin} alt="Место" />
              <Typography component={TypographyComponent.Span}>
                {meetup.place || '—'}
              </Typography>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="">
      <div className={hiddenPreview ? '' : styles.hidden}>
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
              author: meetup.author.name + ' ' + meetup.author.surname,
              excerpt: meetup.excerpt,
            }}
            validationSchema={yup.object().shape({
              start: yup.date().typeError('Укажите дату и время начала митапа'),
              finish: yup.date().typeError('Укажите дату и время конца митапа'),
              place: yup.string().required('Это поле обязательно'),
            })}
            onSubmit={(values: EditFieldsValues, { setSubmitting }) => {
              console.log(values);
              setSubmitting(false); // onSubmit is sync, so need to call this
            }}
            validate={(values) => {
              meetup.image = values.image;
              meetup.subject = values.subject;
              meetup.start = values.start?.toJSON();
              meetup.finish = values.finish?.toJSON();
              meetup.place = values.place;
              meetup.excerpt = values.excerpt;
              console.log(values.author, values.author.split(' ').length);
              if (values.author.split(' ').length === 1) {
                console.log(!values.author.split(' ')[1]);
              }
              //console.log(values.author, values.author.length)
              if (
                !(
                  values.author.split(' ')[0] === meetup.author.name &&
                  values.author.split(' ')[1] === meetup.author.surname
                )
              ) {
                newAthorMeetup.id = 'ddd-bbb';
                newAthorMeetup.name = values.author.split(' ')[0];
                newAthorMeetup.surname = values.author.split(' ')[1];
                meetup.author = newAthorMeetup;
                meetup.speakers = [newAthorMeetup];
              }
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
                <TextField
                  name="excerpt"
                  labelText="Описание"
                  multiline={true}
                />
              </Form>
            )}
          </Formik>
        </div>
        <div className={classNames(styles.buttonContent, styles.actions)}>
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
              onClick={() => setHiddenPreview(false)}
              style={{ width: '128px' }}
            >
              Предпросмотр
            </Button>
          </div>
          <div className={styles.actionsWrapper}>
            <Button
              variant={ButtonVariant.Primary}
              style={{ width: '128px' }}
              onClick={update}
            >
              Сохранить
            </Button>
          </div>
        </div>
      </div>

      <div className={hiddenPreview ? styles.hidden : ''}>
        <Typography
          className={styles.header}
          component={TypographyComponent.Heading2}
        >
          Предпросмотр Митапа
        </Typography>
        <div className={styles.headerData}>
          <img
            className={styles.image}
            src={defaultImage}
            alt="Изображение митапа"
          />
          <div className={styles.headerDataContent}>
            <Typography
              className={styles.meetupHeading}
              component={TypographyComponent.Heading2}
            >
              {meetup.subject}
            </Typography>
          </div>
        </div>

        {renderTimePlace()}

        <div className={styles.data}>
          <Typography
            component={TypographyComponent.Span}
            className={styles.dataName}
          >
            {meetup.status === MeetupStatus.DRAFT ? 'Автор' : 'Спикер'}
          </Typography>
          <div className={styles.dataContent}>
            {meetup.status === MeetupStatus.DRAFT ? (
              <UserPreview user={meetup.author} />
            ) : (
              <div className={styles.speakerWrapper}>
                {meetup.speakers.map((speaker) => (
                  <UserPreview key={speaker.id} user={speaker} />
                ))}
              </div>
            )}
          </div>
        </div>

        <div className={styles.data}>
          <Typography
            component={TypographyComponent.Span}
            className={styles.dataName}
          >
            Описание
          </Typography>
          <div className={styles.dataContent}>
            <Typography
              component={TypographyComponent.Paragraph}
              className={styles.excerpt}
            >
              {meetup.excerpt}
            </Typography>
          </div>
        </div>

        <div className={classNames(styles.buttonContent, styles.actions)}>
          <Button
            variant={ButtonVariant.Default}
            onClick={() => setHiddenPreview(true)}
            style={{ width: '128px' }}
          >
            Отмена
          </Button>
          <div className={styles.actionsWrapper}>
            <Button
              variant={ButtonVariant.Primary}
              style={{ width: '128px' }}
              onClick={update}
            >
              Сохранить
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
