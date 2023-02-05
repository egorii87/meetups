import React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

import { Typography, UserPreview, UserPreviewVariant } from 'components';
import { ShortUser } from 'model';
import { SelectLang } from 'lang/SelectLang';

import styles from './Header.module.scss';
import logo from 'assets/images/logo.svg';

const user: ShortUser = {
  id: 'AAA-AAA',
  name: 'Albert',
  surname: 'Richards',
};

export const Header = (): JSX.Element => (
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
          >
            <Typography>
              <FormattedMessage id="mainTabs.news" defaultMessage="Новости" />
            </Typography>
          </NavLink>
        </nav>
        <SelectLang />
        <UserPreview variant={UserPreviewVariant.Header} user={user} />
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
