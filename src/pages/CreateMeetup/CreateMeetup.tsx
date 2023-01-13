import {
  StepElementProps,
  Stepper,
  Typography,
  TypographyComponent,
  TextField,
  DateTimePicker,
  ImageUploader,
  ImagePreviewMode,
} from 'components';
import * as yup from 'yup';
import { Formik, Form } from 'formik';

import styles from './CreateMeetup.module.scss';

interface FormValues {
  [name: string]: String;
}

interface DateValues {
  [name: string]: Date | null;
}

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

const requiredFields = ({ setConfirmed, index }: StepElementProps) => (
  <div>
    {descriptionText()}
    <div className={styles.inputForm}>
      <Formik
        initialValues={{
          title: '',
          speaker: '',
          description: '',
        }}
        validationSchema={yup.object().shape({
          title: yup.string().required(`Это поле обязательно`),
          speaker: yup.string().required(`Это поле обязательно`),
          description: yup.string().required(`Это поле обязательно`),
        })}
        onSubmit={(values: FormValues, { setSubmitting }) => {
          console.log(values);
          setConfirmed(index, true);
        }}
      >
        {({ values }) => (
          <Form
            autoComplete="off"
            className={styles.formStyle}
            onChange={() => {
              if (
                values.title !== '' &&
                values.speaker !== '' &&
                values.description !== ''
              ) {
                setConfirmed(index, true);
              } else {
                setConfirmed(index, false);
              }
              console.log(values.title, values.speaker, values.description);
            }}
          >
            <TextField name="title" labelText="Название" multiline={false} />
            <TextField name="speaker" labelText="Спикер" multiline={false} />
            <TextField
              name="description"
              labelText="Описание"
              multiline={true}
            />
          </Form>
        )}
      </Formik>
    </div>
  </div>
);

const additionalFields = ({ setConfirmed, index }: StepElementProps) => (
  <div className="">
    {descriptionText()}
    <div className={styles.inputForm}>
      <Formik<DateValues>
        initialValues={{
          startDate: null,
          endDate: null,
        }}
        validationSchema={yup.object().shape({
          startDate: yup.date().typeError('Select start date and time'),
          endDate: yup.date().typeError('Select end date and time'),
          place: yup.string().required(`Это поле обязательно`),
          uploader: yup
            .mixed()
            .required(
              'Пожалуйста, загрузите изображение формата .jpg, .jpeg или .png',
            ),
        })}
        onSubmit={(values: DateValues, { setSubmitting }) => {
          console.log(values);
          setSubmitting(false); // onSubmit is sync, so need to call this
        }}
      >
        {({ values }) => (
          <Form
            autoComplete="off"
            className={styles.formStyle}
            onChange={() => console.log(values)}
          >
            <ul className={styles.datePicker}>
              <li className={styles.datePickerChild}>
                <DateTimePicker name="startDate" labelText="Начало" />
              </li>
              <li className={styles.datePickerChild}>
                <DateTimePicker name="endDate" labelText="Конец" />
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
              name="uploader"
              variant={ImagePreviewMode.Thumbnail}
            />
          </Form>
        )}
      </Formik>
      <button onClick={() => setConfirmed(index, true)}>Click to pass</button>
    </div>
  </div>
);

export const CreateMeetup = () => {
  const steps = [
    {
      title: 'Обязательные поля',
      element: requiredFields,
    },
    {
      title: 'Дополнительные поля',
      element: additionalFields,
    },
  ];

  let onFinishCheck = () => alert('Finish');

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
