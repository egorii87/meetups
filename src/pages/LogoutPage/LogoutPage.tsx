import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router';
import {
  Button,
  ButtonVariant,
  Typography,
  TypographyComponent,
} from 'components';
import { FormattedMessage } from 'react-intl';
import { userStore } from 'stores';

import styles from './LogoutPage.module.scss';

export const LogoutPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <section className={styles.container}>
        <Typography
          className={styles.heading}
          component={TypographyComponent.Heading2}
        >
          <FormattedMessage
            id="logout.name"
            defaultMessage="Имя пользователя"
          />
          {`: ${userStore.currentUser?.name} ${userStore.currentUser?.surname}`}
        </Typography>
        <Typography
          className={styles.heading}
          component={TypographyComponent.Heading3}
        >
          id
          {`: ${userStore.currentUser?.id}`}
        </Typography>
        <Typography
          className={styles.heading}
          component={TypographyComponent.Heading3}
        >
          <FormattedMessage id="logout.role" defaultMessage="Роль" />
          {`: ${userStore.currentUser?.roles}`}
        </Typography>

        <Button
          variant={ButtonVariant.Primary}
          onClick={async () => {
            await userStore.logout();
            navigate('/meetups');
          }}
        >
          <FormattedMessage id="logout.button" defaultMessage="Выйти" />
        </Button>
      </section>
    </div>
  );
};
