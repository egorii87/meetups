import {
  StepElementProps,
  TextField,
  DateTimePicker,
  ImageUploader,
  ImagePreviewMode,
} from 'components';
import { DescriptionText, meetup } from 'pages';
import { Formik, Form } from 'formik';
import { FormattedMessage } from 'react-intl';
import * as yup from 'yup';

import styles from './AdditionalFields.module.scss';

type AdditionalFieldsValues = {
  start?: Date;
  finish?: Date;
  place?: string;
  image?: File;
};

export let image64: string;

export const AdditionalFields = ({ setConfirmed, index }: StepElementProps) => {
  return (
    <div>
      <DescriptionText />
      <div className={styles.inputForm}>
        <Formik<AdditionalFieldsValues>
          initialValues={{
            start: undefined,
            finish: undefined,
            place: undefined,
            image: undefined,
          }}
          validationSchema={yup.object().shape({
            start: yup.date().typeError('Укажите дату и время начала митапа'),
            finish: yup.date().typeError('Укажите дату и время конца митапа'),
          })}
          onSubmit={(values: AdditionalFieldsValues, { setSubmitting }) => {
            console.log(values);
            setSubmitting(false); // onSubmit is sync, so need to call this
          }}
          validate={(values) => {
            if (!!values.start && !!values.finish && !!values.place) {
              meetup.start = values.start?.toJSON();
              meetup.finish = values.finish?.toJSON();
              meetup.place = values.place;
              meetup.image = values.image;
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
            setConfirmed(
              index,
              !!values.start &&
                !!values.finish &&
                !!values.place &&
                !!values.image,
            );
          }}
        >
          {
            <Form autoComplete="off" className={styles.formStyle}>
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
                        defaultMessage="Конец"
                      />
                    }
                  />
                </li>
              </ul>
              <div className={styles.placeField}>
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
              </div>
              <ImageUploader
                name="image"
                variant={ImagePreviewMode.Thumbnail}
              />
            </Form>
          }
        </Formik>
      </div>
    </div>
  );
};
