import { useNavigate, useParams } from 'react-router';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

import {
  Button,
  ButtonVariant,
  Typography,
  TypographyComponent,
  UserPreview,
  UserPreviewVariant,
  removeMeetup,
} from 'components';
import { MeetupStatus, ShortUser } from 'model';
import { parseDateString } from 'helpers';
import { useMeetupQuery } from 'hooks';
import { NotFoundPage } from 'pages';

import styles from './ViewMeetupPage.module.scss';
import defaultImage from 'assets/images/default-image.jpg';
import calendar from './assets/calendar.svg';
import clock from './assets/clock.svg';
import pin from './assets/pin.svg';

const MAX_PREVIEW_USERS = 8;

export const ViewMeetupPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { meetup, isLoading } = useMeetupQuery(id!);
  const votedUsers = meetup?.votedUsers ?? [];

  if (isLoading || meetup === undefined) {
    return <div>Загрузка...</div>;
  }

  if (meetup === null) {
    return <NotFoundPage />;
  }

  const renderImg = () => {
    if (!!id) {
      let image = localStorage.getItem(id);
      if (image) {
        return image;
      }
    }
  };

  const renderHeader = () => {
    if (meetup.status === MeetupStatus.DRAFT) {
      return (
        <div className={styles.data}>
          <Typography
            component={TypographyComponent.Span}
            className={styles.dataName}
          >
            <FormattedMessage id="fieldsName.title" defaultMessage="Название" />
          </Typography>
          <div className={styles.dataContent}>
            <Typography
              className={styles.meetupHeading}
              component={TypographyComponent.Heading2}
            >
              {meetup.subject}
            </Typography>
          </div>
        </div>
      );
    }

    return (
      <div className={styles.headerData}>
        <img
          className={styles.image}
          src={renderImg() || defaultImage}
          alt="Изображение митапа"
        />
        <div className={styles.headerDataContent}>
          <Typography
            className={styles.meetupHeading}
            component={TypographyComponent.Heading2}
          >
            {meetup.subject}
          </Typography>
        </div>
      </div>
    );
  };

  const renderTimePlace = () => {
    if (meetup.status === MeetupStatus.DRAFT) {
      return null;
    }

    let date, time;

    if (meetup.start) {
      const {
        formattedWeekdayLong,
        formattedDateDay,
        translatedFormattedDateMonth,
        formattedTime,
      } = parseDateString(meetup.start);

      date = [
        formattedWeekdayLong,
        ', ',
        `${formattedDateDay}`,
        ' ',
        translatedFormattedDateMonth,
      ];
      time = `${formattedTime}`;

      if (meetup.finish) {
        const { formattedTime } = parseDateString(meetup.finish);

        time = time + ` — ${formattedTime}`;
      }
    }

    return (
      <div className={styles.data}>
        <Typography
          component={TypographyComponent.Span}
          className={styles.dataName}
        >
          <FormattedMessage
            id="fieldsName.timeAndLocation"
            defaultMessage="Время и место проведения"
          />
        </Typography>
        <div className={styles.dataContent}>
          <div className={styles.timePlaceInfo}>
            <div className={styles.info}>
              <img className={styles.image} src={calendar} alt="Дата" />
              <Typography component={TypographyComponent.Span}>
                {date ? date : '—'}
              </Typography>
            </div>
            <div className={styles.info}>
              <img className={styles.image} src={clock} alt="Время" />
              <Typography component={TypographyComponent.Span}>
                {time || '—'}
              </Typography>
            </div>
            <div className={styles.info}>
              <img className={styles.image} src={pin} alt="Место" />
              <Typography component={TypographyComponent.Span}>
                {meetup.place || '—'}
              </Typography>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderAuthor = () => (
    <div className={styles.data}>
      <Typography
        component={TypographyComponent.Span}
        className={styles.dataName}
      >
        {meetup.status === MeetupStatus.DRAFT ? (
          <FormattedMessage id="fieldsName.author" defaultMessage="Автор" />
        ) : (
          <FormattedMessage id="fieldsName.speaker" defaultMessage="Спикер" />
        )}
      </Typography>
      <div className={styles.dataContent}>
        {meetup.status === MeetupStatus.DRAFT ? (
          <UserPreview user={meetup.author} />
        ) : (
          <div className={styles.speakerWrapper}>
            {meetup.speakers.map((speaker) => (
              <UserPreview key={speaker.id} user={speaker} />
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const renderVotedUsers = () => {
    if (votedUsers?.length === 0) {
      return null;
    }

    const previewVotedUsers = votedUsers.slice(0, MAX_PREVIEW_USERS);

    return (
      <div className={styles.data}>
        <Typography
          component={TypographyComponent.Span}
          className={styles.dataName}
        >
          <FormattedMessage
            id="fieldsName.support"
            defaultMessage="Поддерживают"
          />
        </Typography>
        <div className={classNames(styles.dataContent, styles.votedUsers)}>
          {previewVotedUsers.map((user: ShortUser) => (
            <UserPreview
              key={user.id}
              variant={UserPreviewVariant.Image}
              user={user}
            />
          ))}
          {votedUsers.length - MAX_PREVIEW_USERS > 0 && (
            <div className={styles.restCounter}>
              +{votedUsers.length - MAX_PREVIEW_USERS}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderActions = () => {
    return (
      <div className={classNames(styles.dataContent, styles.actions)}>
        <Button variant={ButtonVariant.Default} onClick={() => navigate(-1)}>
          <FormattedMessage id="buttons.back" defaultMessage="Назад" />
        </Button>
        {meetup.status === MeetupStatus.DRAFT && (
          <div className={styles.actionsWrapper}>
            <Button
              variant={ButtonVariant.Secondary}
              onClick={async (e) => {
                e.preventDefault();
                !!id && removeMeetup(id);
                navigate('/meetups/topics');
              }}
            >
              <FormattedMessage id="buttons.delete" defaultMessage="Удалить" />
            </Button>
            <Button variant={ButtonVariant.Primary}>
              <FormattedMessage
                id="buttons.approveTopic"
                defaultMessage="Одобрить тему"
              />
            </Button>
          </div>
        )}
        {meetup.status === MeetupStatus.REQUEST && (
          <div className={styles.actionsWrapper}>
            <Button
              variant={ButtonVariant.Secondary}
              onClick={(e) => {
                e.preventDefault();
                !!id && removeMeetup(id);
                navigate('/meetups/moderation');
              }}
            >
              <FormattedMessage id="buttons.delete" defaultMessage="Удалить" />
            </Button>
            <Button variant={ButtonVariant.Primary}>
              <FormattedMessage
                id="buttons.publish"
                defaultMessage="Опубликовать"
              />
            </Button>
          </div>
        )}
        {meetup.status === MeetupStatus.CONFIRMED && (
          <Button
            variant={ButtonVariant.Secondary}
            onClick={(e) => {
              e.preventDefault();
              !!id && removeMeetup(id);
              navigate('/meetups/upcoming');
            }}
          >
            <FormattedMessage id="buttons.delete" defaultMessage="Удалить" />
          </Button>
        )}
      </div>
    );
  };

  return (
    <section className={styles.container}>
      <Typography
        className={styles.heading}
        component={TypographyComponent.Heading1}
      >
        {meetup.status === MeetupStatus.DRAFT ? (
          <FormattedMessage
            id="meetups.topicsPreview.header"
            defaultMessage="Просмотр Темы"
          />
        ) : (
          <FormattedMessage
            id="meetups.meetupsPreview.header"
            defaultMessage="Просмотр Митапа"
          />
        )}
      </Typography>
      <div className={styles.dataWrapper}>
        {renderHeader()}
        {renderTimePlace()}
        {renderAuthor()}
        <div className={styles.data}>
          <Typography
            component={TypographyComponent.Span}
            className={styles.dataName}
          >
            <FormattedMessage
              id="fieldsName.description"
              defaultMessage="Описание"
            />
          </Typography>
          <div className={styles.dataContent}>
            <Typography
              component={TypographyComponent.Paragraph}
              className={styles.excerpt}
            >
              {meetup.excerpt}
            </Typography>
          </div>
        </div>
        {renderVotedUsers()}
        {renderActions()}
      </div>
    </section>
  );
};
