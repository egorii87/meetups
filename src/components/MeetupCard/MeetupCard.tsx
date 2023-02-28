import classNames from 'classnames';
import { useNavigate } from 'react-router';

import {
  Button,
  ButtonVariant,
  DeleteButton,
  EditButton,
  Typography,
  TypographyComponent,
  UserPreview,
  UserPreviewVariant,
  VotesCount,
} from 'components';
import { parseDateString } from 'helpers';
import { Meetup, MeetupStatus, ShortUser } from 'model';
import { meetupStore, userStore } from 'stores';

import styles from './MeetupCard.module.scss';

interface MeetupCardProps {
  meetup: Meetup;
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

export const MeetupCard = ({ meetup }: MeetupCardProps): JSX.Element => {
  const {
    status,
    author,
    start,
    place,
    subject,
    excerpt,
    goCount,
    isOver,
    id,
  } = meetup;

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

  const renderSupportButton = () => {
    return (
      <Button
        variant={ButtonVariant.Secondary}
        style={{ width: '130px', height: '20px', borderRadius: '10px' }}
        disabled={true}
        onClick={async (e) => {
          e.preventDefault();
          if (userStore.currentShortUser) {
            let result = await meetupStore.deleteVotedUser(
              id,
              userStore.currentShortUser,
            );
            console.log(result);
          }
        }}
      >
        Поддерживаете
      </Button>
    );

    /* return (
      <Button
        variant={ButtonVariant.Primary}
        
        style={{ width: '130px', height: '20px', borderRadius: '10px' }}
        onClick={async (e) => {
          e.preventDefault();
          if(userStore.currentShortUser){
            let result = await meetupStore.addVotingUser(id, userStore.currentShortUser);
            console.log(result)
          }
        }}
      >
        Поддержать
      </Button>
    ) */
  };

  const getVariant = (): MeetupCardVariant => {
    switch (status) {
      case MeetupStatus.DRAFT:
      default:
        return MeetupCardVariant.Topic;
      case MeetupStatus.REQUEST:
        return MeetupCardVariant.OnModeration;
      case MeetupStatus.CONFIRMED:
        return isOver ? MeetupCardVariant.Finished : MeetupCardVariant.Upcoming;
    }
  };

  const variant = getVariant();

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
          <DeleteButton
            onClick={(e) => {
              e.preventDefault();
              removeMeetup(id);
            }}
          />
          {status !== MeetupStatus.DRAFT && (
            <EditButton
              onClick={(e) => {
                e.preventDefault();
                openEditMeetupPage();
              }}
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
          goCount > 0 && (
            <div className={styles.support}>
              <VotesCount votesCount={goCount} />
              {renderSupportButton()}
            </div>
          )
        ) : (
          <UserPreview user={author} variant={UserPreviewVariant.Card} />
        )}
      </footer>
    </article>
  );
};
