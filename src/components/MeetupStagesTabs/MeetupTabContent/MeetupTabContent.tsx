import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { NavLink } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import {
  Button,
  ButtonVariant,
  MeetupCard,
  MeetupCardVariant,
} from 'components';
import { Meetup } from 'model';
import { meetupStore, userStore } from 'stores';

import styles from './MeetupTabContent.module.scss';

interface MeetupTabContentProps {
  variant: MeetupCardVariant;
}

export const getCounterEnding = (num: number, variant: MeetupCardVariant) => {
  const lastNumber = num % 10;
  const lastTwoNumbers = num % 100;

  switch (variant) {
    case MeetupCardVariant.Topic:
      if (
        [5, 6, 7, 8, 9, 0].includes(lastNumber) ||
        [11, 12, 13, 14].includes(lastTwoNumbers)
      )
        return (
          <FormattedMessage
            id="meetups.tabs.meetupsCount.topics0"
            defaultMessage="тем предложено"
          />
        );
      if ([2, 3, 4].includes(lastNumber))
        return (
          <FormattedMessage
            id="meetups.tabs.meetupsCount.topics2"
            defaultMessage="темы предложено"
          />
        );
      if (lastNumber === 1)
        return (
          <FormattedMessage
            id="meetups.tabs.meetupsCount.topics1"
            defaultMessage="тема предложена"
          />
        );
      break;
    case MeetupCardVariant.OnModeration:
      if (
        [5, 6, 7, 8, 9, 0].includes(lastNumber) ||
        [11, 12, 13, 14].includes(lastTwoNumbers)
      )
        return (
          <FormattedMessage
            id="meetups.tabs.meetupsCount.meetups0.onModeration"
            defaultMessage="митапов на модерации"
          />
        );
      if ([2, 3, 4].includes(lastNumber))
        return (
          <FormattedMessage
            id="meetups.tabs.meetupsCount.meetups2.onModeration"
            defaultMessage="митапа на модерации"
          />
        );
      if (lastNumber === 1)
        return (
          <FormattedMessage
            id="meetups.tabs.meetupsCount.meetups1.onModeration"
            defaultMessage="митап на модерации"
          />
        );
      break;
    case MeetupCardVariant.Upcoming:
      if (
        [5, 6, 7, 8, 9, 0].includes(lastNumber) ||
        [11, 12, 13, 14].includes(lastTwoNumbers)
      )
        return (
          <FormattedMessage
            id="meetups.tabs.meetupsCount.meetups0.published"
            defaultMessage="митапов опубликовано"
          />
        );
      if ([2, 3, 4].includes(lastNumber))
        return (
          <FormattedMessage
            id="meetups.tabs.meetupsCount.meetups2.published"
            defaultMessage="митапа опубликовано"
          />
        );
      if (lastNumber === 1)
        return (
          <FormattedMessage
            id="meetups.tabs.meetupsCount.meetups1.published"
            defaultMessage="митап опубликован"
          />
        );
      break;
    case MeetupCardVariant.Finished:
      if (
        [5, 6, 7, 8, 9, 0].includes(lastNumber) ||
        [11, 12, 13, 14].includes(lastTwoNumbers)
      )
        return (
          <FormattedMessage
            id="meetups.tabs.meetupsCount.meetups0.passed"
            defaultMessage="митапов прошло"
          />
        );
      if ([2, 3, 4].includes(lastNumber))
        return (
          <FormattedMessage
            id="meetups.tabs.meetupsCount.meetups2.passed"
            defaultMessage="митапа прошло"
          />
        );
      if (lastNumber === 1)
        return (
          <FormattedMessage
            id="meetups.tabs.meetupsCount.meetups1.passed"
            defaultMessage="митап прошёл"
          />
        );
      break;
  }
};

export const MeetupTabContent = ({ variant }: MeetupTabContentProps) => {
  const [meetups, setMeetups] = useState<Meetup[]>([]);

  const navigate = useNavigate();

  const openCreateMeetupPage = () => navigate('/meetups/create');

  useEffect(() => {
    (async () => {
      await meetupStore.init();
      switch (variant) {
        case MeetupCardVariant.Topic:
          setMeetups(meetupStore.getTopics);
          break;
        case MeetupCardVariant.OnModeration:
          setMeetups(meetupStore.getOnModeration);
          break;
        case MeetupCardVariant.Upcoming:
          setMeetups(meetupStore.getUpcoming);
          break;
        case MeetupCardVariant.Finished:
          setMeetups(meetupStore.getFinished);
          break;
      }
    })();
  }, [variant]);

  return (
    <section className={styles.topicsTab}>
      <div className={styles.wrapper}>
        <div className={styles.counter}>
          {meetups.length} {getCounterEnding(meetups.length, variant)}
        </div>
        {variant === MeetupCardVariant.Topic &&
          userStore.hasPermissionToCreateMeetup() && (
            <Button
              variant={ButtonVariant.Secondary}
              onClick={openCreateMeetupPage}
            >
              <FormattedMessage
                id="buttons.createMeetup"
                defaultMessage="+ Создать Митап"
              />
            </Button>
          )}
      </div>
      <div className={styles.topics}>
        {meetups.map((meetup) => (
          <NavLink to={`/meetups/${meetup.id}`} key={meetup.id}>
            <MeetupCard meetup={meetup} />
          </NavLink>
        ))}
      </div>
    </section>
  );
};
