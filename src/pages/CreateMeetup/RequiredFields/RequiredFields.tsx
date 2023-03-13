import { StepElementProps, TextField, InputLabel } from 'components';
import { DescriptionText, meetup } from 'pages';
import { ShortUser } from 'model';
import { Formik, Form } from 'formik';
import { FormattedMessage } from 'react-intl';
import AsyncSelect from 'react-select';
import * as yup from 'yup';
import { useState } from 'react';
import { userStore } from 'stores';

import styles from './RequiredFields.module.scss';

type RequiredFieldsValues = {
  subject: string;
  author: string;
  excerpt: string;
};

export const RequiredFields = ({ setConfirmed, index }: StepElementProps) => {
  const [selectedOption, setSelectedOption] = useState<ShortUser>();

  const handleTypeSelect = (e: any) => {
    setSelectedOption(e.value);
  };

  return (
    <div>
      <DescriptionText />
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
          onSubmit={(values: RequiredFieldsValues, { setSubmitting }) => {
            console.log(values);
            setConfirmed(index, true);
          }}
          validate={(values) => {
            if (!!values.subject && !!selectedOption && !!values.excerpt) {
              meetup.subject = values.subject;
              meetup.excerpt = values.excerpt;
              meetup.author = userStore.currentShortUser as ShortUser;
              meetup.speakers = [selectedOption];
            }
            setConfirmed(
              index,
              !!values.subject && !!selectedOption && !!values.excerpt,
            );
          }}
        >
          {() => {
            return (
              <Form autoComplete="off" className={styles.formStyle}>
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
                <div>
                  <InputLabel className={styles.selectLabel} name="qwe">
                    <FormattedMessage
                      id="fieldsName.speaker"
                      defaultMessage="Спикер"
                    />
                  </InputLabel>
                  <AsyncSelect
                    classNamePrefix="select"
                    isSearchable={true}
                    options={userStore.getAuthorList}
                    onChange={handleTypeSelect}
                    maxMenuHeight={150}
                    className={styles.select}
                    placeholder=""
                    styles={{
                      control: (base) => ({
                        ...base,
                        border: '1px solid #d5dce7',
                        minHeight: '40px',
                        width: '100%',
                      }),
                    }}
                  />
                </div>
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
            );
          }}
        </Formik>
      </div>
    </div>
  );
};
