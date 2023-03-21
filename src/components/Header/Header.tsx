import React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { observer } from 'mobx-react-lite';
import { dataCy } from 'helpers';

import {
  Typography,
  UserPreview,
  UserPreviewVariant,
  Tooltip,
  TooltipVariant,
} from 'components';
import { userStore } from 'stores';

import styles from './Header.module.scss';
import logo from 'assets/images/logo.svg';

interface HeaderProps {
  LanguageSelector?: JSX.Element;
}

const handleLogout = async () => {
  await userStore.logout();
  window.location.reload();
};

const User = observer(() => {
  if (userStore.currentUser) {
    return (
      <Tooltip
        description={
          <FormattedMessage id="logout.button" defaultMessage="Выйти" />
        }
        variant={TooltipVariant.Dark}
        descriptionAction={handleLogout}
      >
        <UserPreview
          variant={UserPreviewVariant.Header}
          user={userStore.currentUser}
        />
      </Tooltip>
    );
  }

  return (
    <NavLink
      to="/login"
      className={({ isActive }) =>
        classNames(styles.navLink, {
          [styles.active]: isActive,
        })
      }
      {...dataCy('login')}
    >
      <Typography>
        <FormattedMessage
          id="mainTabs.singin"
          defaultMessage="Авторизоваться"
        />
      </Typography>
    </NavLink>
  );
});

export const Header = ({ LanguageSelector }: HeaderProps): JSX.Element => (
  <header className={styles.header}>
    <div className={styles.container}>
      <div className={styles.navWrapper}>
        <img src={logo} className={styles.logo} alt="Логотип" />
        <nav className={classNames(styles.nav, styles.hiddenOnSmall)}>
          <NavLink
            to="/meetups"
            className={({ isActive }) =>
              classNames(styles.navLink, {
                [styles.active]: isActive,
              })
            }
          >
            <Typography>
              <FormattedMessage id="mainTabs.meetups" defaultMessage="Митапы" />
            </Typography>
          </NavLink>
          <NavLink
            to="/news"
            className={({ isActive }) =>
              classNames(styles.navLink, {
                [styles.active]: isActive,
              })
            }
            {...dataCy('news')}
          >
            <Typography>
              <FormattedMessage id="mainTabs.news" defaultMessage="Новости" />
            </Typography>
          </NavLink>
        </nav>
        {LanguageSelector}
        <User />
      </div>

      <div className={styles.navAdaptiveWrapper}>
        <nav className={styles.nav}>
          <NavLink
            to="/meetups"
            className={({ isActive }) =>
              classNames(styles.navLink, {
                [styles.active]: isActive,
              })
            }
          >
            <Typography data-testid="meetups">
              <FormattedMessage id="mainTabs.meetups" defaultMessage="Митапы" />
            </Typography>
          </NavLink>
          <NavLink
            to="/news"
            className={({ isActive }) =>
              classNames(styles.navLink, {
                [styles.active]: isActive,
              })
            }
          >
            <Typography>
              <FormattedMessage id="mainTabs.news" defaultMessage="Новости" />
            </Typography>
          </NavLink>
        </nav>
      </div>
    </div>
  </header>
);
