import { Formik } from 'formik';
import * as Yup from 'yup';
import { Button, ButtonVariant, Typography } from 'components';
import { FormattedMessage } from 'react-intl';

import styles from './LoginPage.module.scss';

const schema = Yup.object().shape({
  username: Yup.string().required('Email is a required field'),
  password: Yup.string()
    .required('Password is a required field')
    .min(8, 'Password must be at least 8 characters'),
});

export const LoginPage = () => {
  return (
    <>
      {/* Wrapping form inside formik tag and passing our schema to validationSchema prop */}
      <Formik
        validationSchema={schema}
        initialValues={{ username: '', password: '' }}
        onSubmit={(values) => {
          // Alert the input values of the form that we filled
          alert(JSON.stringify(values));
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <div className={styles.login}>
            <div className={styles.form}>
              {/* Passing handleSubmit parameter tohtml form onSubmit property */}
              <form noValidate onSubmit={handleSubmit}>
                <Typography>
                  <FormattedMessage id="login" defaultMessage="Логин" />
                </Typography>
                {/* Our input html with passing formik parameters like handleChange, values, handleBlur to input properties */}
                <input
                  type="text"
                  name="username"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.username}
                  placeholder="Enter username"
                  className="form-control inp_text"
                  id="username"
                />
                {/* If validation is not passed show errors */}
                <p className={styles.error}>
                  {errors.username && touched.username && errors.username}
                </p>
                {/* Our input html with passing formik parameters like handleChange, values, handleBlur to input properties */}
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  placeholder="Enter password"
                  className="form-control"
                />
                {/* If validation is not passed show errors */}
                <p className={styles.error}>
                  {errors.password && touched.password && errors.password}
                </p>
                {/* Click on submit button to submit the form */}
                <Button
                  variant={ButtonVariant.Primary}
                  style={{ width: '270px' }}
                >
                  <FormattedMessage
                    id="buttons.signIn"
                    defaultMessage="Войти"
                  />
                </Button>
              </form>
            </div>
          </div>
        )}
      </Formik>
    </>
  );
};
