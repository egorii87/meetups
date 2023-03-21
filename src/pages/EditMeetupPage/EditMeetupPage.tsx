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
  Loader,
  MeetupTimePlace,
  NotificationVariant,
  notification,
} from 'components';
import * as yup from 'yup';
import { Formik, Form } from 'formik';
import { useNavigate, useParams } from 'react-router';
import { useMeetupQuery } from 'hooks';
import { NotFoundPage } from 'pages';
import classNames from 'classnames';
import { meetupStore, userStore } from 'stores';
import { MeetupStatus } from 'model';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { convertImageFromBase64toFile } from 'helpers';

import styles from './EditMeetupPage.module.scss';
import defaultImage from 'assets/images/default-image.jpg';
type EditFieldsValues = {
  image?: File;
  subject: string;
  start?: Date;
  finish?: Date;
  place?: string;
  speaker: string;
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
    notification(NotificationVariant.Success, 'Митап успешно изменён');
  };

  let image = (id && localStorage.getItem(id)) as string;

  if (isLoading || meetup === undefined) {
    return <Loader />;
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
      <div className={hiddenPreview ? '' : styles.hidden}>
        <Typography
          className={styles.header}
          component={TypographyComponent.Heading2}
        >
          <FormattedMessage
            id="meetups.editMeetups.header"
            defaultMessage="Редактирование Митапа"
          />
        </Typography>
        <div className={styles.wrapper}>
          <Formik<EditFieldsValues>
            initialValues={{
              image: image ? convertImageFromBase64toFile(image) : undefined,
              subject: meetup.subject,
              start: changeFormatDate(meetup.start),
              finish: changeFormatDate(meetup.finish),
              place: meetup.place,
              speaker:
                meetup.speakers[0].name + ' ' + meetup.speakers[0].surname,
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
              if (values.image === null) {
                id && localStorage.removeItem(id);
              }
              if (!!values.image && id) {
                const fr = new FileReader();
                fr.readAsDataURL(values.image);
                fr.addEventListener('load', () => {
                  const res = fr.result;
                  if (typeof res === 'string') {
                    localStorage.setItem(id, res);
                  }
                });
              }
              meetup.image = values.image;
              meetup.subject = values.subject;
              meetup.start = values.start?.toJSON();
              meetup.finish = values.finish?.toJSON();
              meetup.place = values.place;
              meetup.excerpt = values.excerpt;
            }}
          >
            {() => (
              <Form autoComplete="off" className={styles.formStyle}>
                <ImageUploader
                  name="image"
                  variant={ImagePreviewMode.Large}
                  labelText={
                    <FormattedMessage
                      id="fieldsName.photo"
                      defaultMessage="Фото"
                    />
                  }
                />
                <TextField
                  name="subject"
                  labelText={
                    <FormattedMessage
                      id="fieldsName.title"
                      defaultMessage="Название"
                    />
                  }
                  multiline={false}
                />
                <ul className={styles.datePicker}>
                  <li className={styles.datePickerChild}>
                    <DateTimePicker
                      name="start"
                      labelText={
                        <FormattedMessage
                          id="fieldsName.start"
                          defaultMessage="Начало"
                        />
                      }
                    />
                  </li>
                  <li className={styles.datePickerChild}>
                    <DateTimePicker
                      name="finish"
                      labelText={
                        <FormattedMessage
                          id="fieldsName.finish"
                          defaultMessage="Окончание"
                        />
                      }
                    />
                  </li>
                </ul>
                <TextField
                  name="place"
                  labelText={
                    <FormattedMessage
                      id="fieldsName.location"
                      defaultMessage="Место проведения"
                    />
                  }
                  multiline={false}
                />
                {userStore.hasChiefPermission() ? (
                  <TextField
                    name="speaker"
                    labelText={
                      <FormattedMessage
                        id="fieldsName.speaker"
                        defaultMessage="Спикер"
                      />
                    }
                    multiline={false}
                  />
                ) : (
                  <TextField
                    name="speaker"
                    labelText={
                      <FormattedMessage
                        id="fieldsName.speaker"
                        defaultMessage="Спикер"
                      />
                    }
                    multiline={false}
                    readonly={true}
                  />
                )}
                <TextField
                  name="excerpt"
                  labelText={
                    <FormattedMessage
                      id="fieldsName.description"
                      defaultMessage="Описание"
                    />
                  }
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
            className={styles.buttonCancel}
          >
            <FormattedMessage id="buttons.cancel" defaultMessage="Отмена" />
          </Button>
          <div className={styles.actionsWrapper}>
            <Button
              variant={ButtonVariant.Secondary}
              onClick={() => setHiddenPreview(false)}
              className={styles.button}
            >
              <FormattedMessage
                id="buttons.preview"
                defaultMessage="Предпросмотр"
              />
            </Button>
          </div>
          <div className={styles.actionsWrapper}>
            <Button
              variant={ButtonVariant.Primary}
              className={styles.button}
              onClick={update}
            >
              <FormattedMessage id="buttons.save" defaultMessage="Сохранить" />
            </Button>
          </div>
        </div>
      </div>

      <div className={hiddenPreview ? styles.hidden : ''}>
        <Typography
          className={styles.header}
          component={TypographyComponent.Heading2}
        >
          <FormattedMessage
            id="meetups.previewMeetups.header"
            defaultMessage="Предпросмотр Митапа"
          />
        </Typography>
        <div className={styles.headerData}>
          <img
            className={styles.image}
            src={id && (localStorage.getItem(id) || defaultImage)}
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
        <div className={styles.timePlace}>
          <MeetupTimePlace meetup={meetup} />
        </div>

        <div className={styles.data}>
          <Typography
            component={TypographyComponent.Span}
            className={styles.dataName}
          >
            {meetup.status === MeetupStatus.DRAFT ? (
              <FormattedMessage id="fieldsName.author" defaultMessage="Автор" />
            ) : (
              <FormattedMessage
                id="fieldsName.speaker"
                defaultMessage="Спикер"
              />
            )}
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
            <FormattedMessage
              id="fieldsName.description"
              defaultMessage="Описание"
            />
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
            className={styles.button}
          >
            <FormattedMessage id="buttons.cancel" defaultMessage="Отмена" />
          </Button>
          <div className={styles.actionsWrapper}>
            <Button
              variant={ButtonVariant.Primary}
              className={styles.button}
              onClick={update}
            >
              <FormattedMessage id="buttons.save" defaultMessage="Сохранить" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
