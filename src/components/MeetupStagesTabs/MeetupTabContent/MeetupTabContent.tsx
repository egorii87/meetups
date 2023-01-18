import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { NavLink } from 'react-router-dom';

import {
  Button,
  ButtonVariant,
  MeetupCard,
  MeetupCardVariant,
} from 'components';
import { Meetup } from 'model';
import { store } from 'stores';

import styles from './MeetupTabContent.module.scss';

interface MeetupTabContentProps {
  variant: MeetupCardVariant;
}

export const MeetupTabContent = ({ variant }: MeetupTabContentProps) => {
  const [meetups, setMeetups] = useState<Meetup[]>([]);

  const navigate = useNavigate();

  const openCreateMeetupPage = () => navigate('/meetups/create');

  useEffect(() => {
    (async () => {
      switch (variant) {
        case MeetupCardVariant.Topic:
          setMeetups(store.getTopics);
          break;
        case MeetupCardVariant.OnModeration:
          setMeetups(store.getOnModeration);
          break;
        case MeetupCardVariant.Upcoming:
          setMeetups(store.getUpcoming);
          break;
        case MeetupCardVariant.Finished:
          setMeetups(store.getFinished);
          break;
      }
    })();
  }, [variant]);

  const getCounterEnding = (num: number, variant: MeetupCardVariant) => {
    const lastNumber = num % 10;
    const lastTwoNumbers = num % 100;

    switch (variant) {
      case MeetupCardVariant.Topic:
        if (
          [5, 6, 7, 8, 9, 0].includes(lastNumber) ||
          [11, 12, 13, 14].includes(lastTwoNumbers)
        )
          return 'тем предложено';
        if ([2, 3, 4].includes(lastNumber)) return 'темы предложено';
        if (lastNumber === 1) return 'тема предложена';
        break;
      case MeetupCardVariant.OnModeration:
        if (
          [5, 6, 7, 8, 9, 0].includes(lastNumber) ||
          [11, 12, 13, 14].includes(lastTwoNumbers)
        )
          return 'митапов на модерации';
        if ([2, 3, 4].includes(lastNumber)) return 'митапа на модерации';
        if (lastNumber === 1) return 'митап на модерации';
        break;
      case MeetupCardVariant.Upcoming:
        if (
          [5, 6, 7, 8, 9, 0].includes(lastNumber) ||
          [11, 12, 13, 14].includes(lastTwoNumbers)
        )
          return 'митапов опубликовано';
        if ([2, 3, 4].includes(lastNumber)) return 'митапа опубликовано';
        if (lastNumber === 1) return 'митап опубликован';
        break;
      case MeetupCardVariant.Finished:
        if (
          [5, 6, 7, 8, 9, 0].includes(lastNumber) ||
          [11, 12, 13, 14].includes(lastTwoNumbers)
        )
          return 'митапов прошло';
        if ([2, 3, 4].includes(lastNumber)) return 'митапа прошло';
        if (lastNumber === 1) return 'митап прошёл';
        break;
    }
  };

  return (
    <section className={styles.topicsTab}>
      <div className={styles.wrapper}>
        <div className={styles.counter}>
          {meetups.length} {getCounterEnding(meetups.length, variant)}
        </div>
        {variant === MeetupCardVariant.Topic && (
          <Button
            variant={ButtonVariant.Secondary}
            onClick={openCreateMeetupPage}
          >
            + Создать митап
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
