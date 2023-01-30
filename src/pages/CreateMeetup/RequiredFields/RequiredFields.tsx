import { StepElementProps, TextField } from 'components';
import { DescriptionText, meetup } from 'pages';
import { ShortUser } from 'model';
import { Formik, Form } from 'formik';
import * as yup from 'yup';

import styles from './RequiredFields.module.scss';

type RequiredFieldsValues = {
  subject: string;
  author: string;
  excerpt: string;
};

const newAthorMeetup: ShortUser = {
  id: '',
  name: '',
  surname: '',
};

export const RequiredFields = ({ setConfirmed, index }: StepElementProps) => {
  return (
    <div>
      <DescriptionText />
      <div className={styles.inputForm}>
        <Formik<RequiredFieldsValues>
          initialValues={{
            subject: '',
            author: '', // I want to display the author's name and surname by default, but I don't know how to do it
            excerpt: '',
          }}
          validationSchema={yup.object().shape({
            subject: yup.string().required(`Это поле обязательно`),
            author: yup.string().required(`Это поле обязательно`),
            excerpt: yup.string().required(`Это поле обязательно`),
          })}
          onSubmit={(values: RequiredFieldsValues, { setSubmitting }) => {
            console.log(values);
            setConfirmed(index, true);
          }}
          validate={(values) => {
            if (!!values.subject && !!values.author && !!values.excerpt) {
              meetup.subject = values.subject;
              meetup.excerpt = values.excerpt;
              if (
                !(
                  values.author.split(' ')[0] === meetup.author.name &&
                  values.author.split(' ')[1] === meetup.author.surname
                )
              ) {
                newAthorMeetup.id = 'qqq-bbb';
                newAthorMeetup.name = values.author.split(' ')[0];
                newAthorMeetup.surname = values.author.split(' ')[1];
                meetup.author = newAthorMeetup;
                meetup.speakers = [newAthorMeetup];
              }
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
                <TextField name="author" labelText="Спикер" multiline={false} />
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
