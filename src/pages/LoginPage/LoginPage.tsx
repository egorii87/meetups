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
      <Formik
        validationSchema={schema}
        initialValues={{ username: '', password: '' }}
        onSubmit={(values) => {
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
              <form noValidate onSubmit={handleSubmit}>
                <Typography>
                  <FormattedMessage id="login" defaultMessage="Логин" />
                </Typography>
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
                <p className={styles.error}>
                  {errors.username && touched.username && errors.username}
                </p>
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  placeholder="Enter password"
                  className="form-control"
                />
                <p className={styles.error}>
                  {errors.password && touched.password && errors.password}
                </p>
                <Button
                  variant={ButtonVariant.Primary}
                  className={styles.loginButton}
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
