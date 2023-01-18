import {
  StepElementProps,
  Stepper,
  Typography,
  TypographyComponent,
  TextField,
  DateTimePicker,
  ImageUploader,
  ImagePreviewMode,
  StepInfo,
} from 'components';
import * as yup from 'yup';
import { Formik, Form } from 'formik';
import React, { useState } from 'react';

import styles from './CreateMeetup.module.scss';

interface FormValues {
  [name: string]: String;
}

interface DateValues {
  [name: string]: Date | String | File | null;
}

type RequiredFieldsValues = {
  subject: string;
  author: string;
  excerpt: string;
};

type AdditionalFieldsValues = {
  start: Date | null;
  finish: Date | null;
  place: string;
  image?: File | null;
};

export const CreateMeetup = () => {
  const descriptionText = () => {
    return (
      <div>
        <Typography
          className={styles.header}
          component={TypographyComponent.Heading1}
        >
          Новый митап
        </Typography>
        <Typography
          className={styles.paragraph}
          component={TypographyComponent.Paragraph}
        >
          Заполните необходимые поля ниже наиболее подробно, это даст полную
          информацию о предстоящем событии.
        </Typography>
      </div>
    );
  };

  const [meetUp, setMeetUp] = useState({});

  const requiredFields = ({ setConfirmed, index }: StepElementProps) => {
    return (
      <div>
        {descriptionText()}
        <div className={styles.inputForm}>
          <Formik<RequiredFieldsValues>
            initialValues={{
              subject: '',
              author: '',
              excerpt: '',
            }}
            validationSchema={yup.object().shape({
              subject: yup.string().required(`Это поле обязательно`),
              author: yup.string().required(`Это поле обязательно`),
              excerpt: yup.string().required(`Это поле обязательно`),
            })}
            onSubmit={(values: FormValues, { setSubmitting }) => {
              console.log(values);
              setConfirmed(index, true);
            }}
            validate={(values) => {
              if (!!values.subject && !!values.author && !!values.excerpt) {
                setMeetUp((meetUp) => ({
                  ...meetUp,
                  ...values,
                }));
              }
              setConfirmed(
                index,
                !!values.subject && !!values.author && !!values.excerpt,
              );
            }}
          >
            {() => {
              return (
                <Form autoComplete="off" className={styles.formStyle}>
                  <TextField
                    name="subject"
                    labelText="Название"
                    multiline={false}
                  />
                  <TextField
                    name="author"
                    labelText="Спикер"
                    multiline={false}
                  />
                  <TextField
                    name="excerpt"
                    labelText="Описание"
                    multiline={true}
                  />
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    );
  };

  const additionalFields = ({ setConfirmed, index }: StepElementProps) => (
    <div className="">
      {descriptionText()}
      <div className={styles.inputForm}>
        <Formik<AdditionalFieldsValues>
          initialValues={{
            start: null,
            finish: null,
            place: '',
            image: null,
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
          onSubmit={(values: DateValues, { setSubmitting }) => {
            console.log(values);
            setSubmitting(false); // onSubmit is sync, so need to call this
          }}
          validate={(values) => {
            if (!!values.start && !!values.finish && !!values.place) {
              setMeetUp((meetUp) => ({
                ...meetUp,
                ...values,
              }));
            }
            setConfirmed(
              index,
              !!values.start &&
                !!values.finish &&
                !!values.place &&
                !!values.image,
            );
          }}
        >
          {() => (
            <Form autoComplete="off" className={styles.formStyle}>
              <ul className={styles.datePicker}>
                <li className={styles.datePickerChild}>
                  <DateTimePicker name="start" labelText="Начало" />
                </li>
                <li className={styles.datePickerChild}>
                  <DateTimePicker name="finish" labelText="Конец" />
                </li>
              </ul>
              <div className={styles.placeField}>
                <TextField
                  name="place"
                  labelText="Место проведения"
                  multiline={false}
                />
              </div>
              <ImageUploader
                name="image"
                variant={ImagePreviewMode.Thumbnail}
              />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );

  const steps: StepInfo[] = [
    {
      title: 'Обязательные поля',
      element: requiredFields,
      noVerify: false,
    },
    {
      title: 'Дополнительные поля',
      element: additionalFields,
      noVerify: false,
    },
  ];

  let onFinishCheck = () => console.log(meetUp);

  return (
    <div className={styles.wrapper}>
      <Stepper
        steps={steps}
        finishButtonContent="Создать"
        onFinish={onFinishCheck}
      />
    </div>
  );
};
