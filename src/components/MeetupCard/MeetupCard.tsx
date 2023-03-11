import { Dispatch, SetStateAction } from 'react';
import classNames from 'classnames';
import { useNavigate } from 'react-router';

import {
  DeleteButton,
  EditButton,
  Typography,
  TypographyComponent,
  UserPreview,
  UserPreviewVariant,
  SupportButton,
} from 'components';
import { parseDateString } from 'helpers';
import { Meetup, MeetupStatus } from 'model';
import { meetupStore, userStore } from 'stores';

import styles from './MeetupCard.module.scss';

interface MeetupCardProps {
  meetup: Meetup;
  setCount: Dispatch<SetStateAction<number>>;
}

export enum MeetupCardVariant {
  Topic = 'topic',
  OnModeration = 'onModeration',
  Upcoming = 'upcoming',
  Finished = 'finished',
}

export const removeMeetup = async (id: string) => {
  await meetupStore.delete(id);
  await meetupStore.init();
};

export const MeetupCard = ({
  meetup,
  setCount,
}: MeetupCardProps): JSX.Element => {
  const { status, author, start, place, subject, excerpt, isOver, id } = meetup;

  const navigate = useNavigate();

  const openEditMeetupPage = () => navigate(`/meetups/${id}/edit`);

  let formattedWeekdayShort: JSX.Element | undefined;
  let formattedDateDay: string | undefined;
  let translatedFormattedDateMonth: JSX.Element | string | undefined;
  let formattedTime: string | undefined;

  if (start) {
    ({
      formattedWeekdayShort,
      formattedDateDay,
      translatedFormattedDateMonth,
      formattedTime,
    } = parseDateString(start));
  }

  const variant = getVariant(status, isOver);

  return (
    <article className={classNames(styles.card, styles[variant])}>
      <header className={styles.header}>
        {status === MeetupStatus.DRAFT ? (
          <UserPreview user={author} variant={UserPreviewVariant.Card} />
        ) : (
          <ul className={styles.appointment}>
            {start !== undefined ? (
              <>
                <li className={styles.appointmentItem} key="date">
                  <Typography className={styles.date}>
                    {formattedWeekdayShort} {`${formattedDateDay}`}{' '}
                    {translatedFormattedDateMonth}
                  </Typography>
                </li>
                <li className={styles.appointmentItem} key="time">
                  <Typography className={styles.time}>
                    {formattedTime}
                  </Typography>
                </li>
              </>
            ) : (
              '—'
            )}
            {place !== undefined && (
              <li className={styles.appointmentItem} key="location">
                <Typography className={styles.location}>{place}</Typography>
              </li>
            )}
          </ul>
        )}
        <div className={styles.controls}>
          {(userStore.hasChiefPermission() ||
            userStore.hasPermissionToInteract(author.id)) && (
            <DeleteButton
              onClick={(e) => {
                e.preventDefault();
                removeMeetup(id);
                setCount(meetupStore.getAllMeetups.length - 1);
              }}
            />
          )}
          {status !== MeetupStatus.DRAFT &&
            (userStore.hasChiefPermission() ||
              userStore.hasPermissionToInteract(author.id)) && (
              <EditButton
                onClick={(e) => {
                  e.preventDefault();
                  openEditMeetupPage();
                }}
                title="Edit meetup"
              />
            )}
        </div>
      </header>

      <div className={styles.body}>
        <Typography
          component={TypographyComponent.Heading2}
          className={styles.subject}
        >
          {subject}
        </Typography>
        {excerpt !== undefined && (
          <Typography
            component={TypographyComponent.Paragraph}
            className={styles.excerpt}
          >
            {excerpt}
          </Typography>
        )}
      </div>

      <footer className={styles.footer}>
        {status === MeetupStatus.DRAFT ? (
          <div>
            {userStore.user && status === MeetupStatus.DRAFT ? (
              <SupportButton id={id} />
            ) : null}
          </div>
        ) : (
          <UserPreview user={author} variant={UserPreviewVariant.Card} />
        )}
      </footer>
    </article>
  );
};

function getVariant(status: MeetupStatus, isOver: boolean): MeetupCardVariant {
  switch (status) {
    case MeetupStatus.DRAFT:
    default:
      return MeetupCardVariant.Topic;
    case MeetupStatus.REQUEST:
      return MeetupCardVariant.OnModeration;
    case MeetupStatus.CONFIRMED:
      return isOver ? MeetupCardVariant.Finished : MeetupCardVariant.Upcoming;
  }
}
