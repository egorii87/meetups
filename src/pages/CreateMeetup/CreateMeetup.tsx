import {
  StepElementProps,
  Stepper,
  Typography,
  TypographyComponent,
  TextField,
} from 'components';
import * as yup from 'yup';
import { Formik, Form } from 'formik';

import styles from './CreateMeetup.module.scss';

interface FormValues {
  [name: string]: String;
}

export const CreateMeetup = () => {
  const steps = [
    {
      title: 'Обязательные поля',
      element: ({ setConfirmed, index }: StepElementProps) => (
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
          <div className={styles.inputForm}>
            <Formik<FormValues>
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
                setSubmitting(false); // onSubmit is sync, so need to call this
              }}
            >
              {({ values, isValid, errors }) => (
                <Form
                  autoComplete="off"
                  style={{
                    width: '470px',
                    maxWidth: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    rowGap: '12px',
                    margin: '0 auto',
                    padding: '24px 0px 34px 0px',
                  }}
                >
                  <TextField
                    name="title"
                    labelText="Название"
                    multiline={false}
                  />
                  <TextField
                    name="speaker"
                    labelText="Спикер"
                    multiline={false}
                  />
                  <TextField
                    name="description"
                    labelText="Описание"
                    multiline={true}
                  />
                  {/* {isValid ? setConfirmed(index, true) : null} */}
                </Form>
              )}
            </Formik>
          </div>
          <button onClick={() => setConfirmed(index, true)}>
            Click to pass
          </button>
        </div>
      ),
    },
    {
      title: 'Дополнительные поля',
      element: ({ setConfirmed, index }: StepElementProps) => (
        <div>
          <p>Some content of step 3</p>
          <button onClick={() => setConfirmed(index, true)}>
            Click to pass
          </button>
        </div>
      ),
    },
  ];

  let onFinishCheck = () => alert('Finish');

  return (
    <div style={{ width: '550px' }}>
      <Stepper
        steps={steps}
        finishButtonContent="Ready"
        onFinish={onFinishCheck}
      />
    </div>
  );
};
