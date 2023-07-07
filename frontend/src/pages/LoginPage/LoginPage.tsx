import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router';
import {
  Button,
  ButtonVariant,
  Typography,
  NotificationVariant,
  notification,
} from 'components';
import { FormattedMessage } from 'react-intl';
import { userStore } from 'stores';
import { dataCy } from 'helpers';

import styles from './LoginPage.module.scss';

const schema = Yup.object().shape({
  username: Yup.string().required('Login is a required field'),
  password: Yup.string()
    .required('Password is a required field')
    .min(5, 'Password must be at least 5 characters'),
});

export const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Formik
        validationSchema={schema}
        initialValues={{ username: '', password: '' }}
        onSubmit={async (values) => {
          const res = await userStore.login(values);
          if (!res) {
            notification(
              NotificationVariant.Error,
              'Неверный логин или пароль',
            );
          } else {
            notification(NotificationVariant.Success, 'Вход выполнен успешно');
            navigate('/meetups');
          }
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
                  type="submit"
                  {...dataCy('submitLogin')}
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
