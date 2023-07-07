import React from 'react';
import classNames from 'classnames';
import { NavLink, Outlet } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import {
  Typography,
  NavTabs,
  MeetupTabContent,
  MeetupCardVariant,
} from 'components';

import styles from './MeetupStagesTabs.module.scss';

enum MeetupTabLink {
  Topics = 'topics',
  OnModeration = 'moderation',
  Upcoming = 'upcoming',
  Finished = 'finished',
}

export const meetupTabsLinks = Object.values(MeetupTabLink);

type MeetupTabDescriptor = {
  label: string | JSX.Element;
  component: React.ReactNode | JSX.Element;
};

export const meetupTabToDescriptor: Record<MeetupTabLink, MeetupTabDescriptor> =
  {
    [MeetupTabLink.Topics]: {
      label: (
        <FormattedMessage
          id="meetups.tabs.stepper.topics"
          defaultMessage="Темы"
        />
      ),
      component: <MeetupTabContent variant={MeetupCardVariant.Topic} />,
    },
    [MeetupTabLink.OnModeration]: {
      label: (
        <FormattedMessage
          id="meetups.tabs.stepper.moderation"
          defaultMessage="На модерации"
        />
      ),
      component: <MeetupTabContent variant={MeetupCardVariant.OnModeration} />,
    },
    [MeetupTabLink.Upcoming]: {
      label: (
        <FormattedMessage
          id="meetups.tabs.stepper.future"
          defaultMessage="Будущие"
        />
      ),
      component: <MeetupTabContent variant={MeetupCardVariant.Upcoming} />,
    },
    [MeetupTabLink.Finished]: {
      label: (
        <FormattedMessage
          id="meetups.tabs.stepper.past"
          defaultMessage="Прошедшие"
        />
      ),
      component: <MeetupTabContent variant={MeetupCardVariant.Finished} />,
    },
  };

export function MeetupStagesTabs() {
  return (
    <>
      <NavTabs className={styles.tabs}>
        {meetupTabsLinks.map(
          (tab: MeetupTabLink): JSX.Element => (
            <NavLink
              key={tab}
              to={tab}
              className={({ isActive }) =>
                classNames(styles.tab, {
                  [styles.active]: isActive,
                })
              }
            >
              <Typography>{meetupTabToDescriptor[tab].label}</Typography>
            </NavLink>
          ),
        )}
      </NavTabs>
      <Outlet />
    </>
  );
}
