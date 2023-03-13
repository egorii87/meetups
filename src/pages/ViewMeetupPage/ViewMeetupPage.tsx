import { useParams } from 'react-router';
import { FormattedMessage } from 'react-intl';

import {
  Typography,
  TypographyComponent,
  Loader,
  MeetupHeader,
  MeetupTimePlace,
  MeetupAuthor,
  MeetupVotedUsers,
  MeetupActions,
} from 'components';
import { MeetupStatus } from 'model';
import { useMeetupQuery } from 'hooks';
import { NotFoundPage } from 'pages';

import styles from './ViewMeetupPage.module.scss';

export const ViewMeetupPage = () => {
  const { id } = useParams();
  const { meetup, isLoading } = useMeetupQuery(id!);
  const votedUsers = meetup?.votedUsers ?? [];

  if (isLoading || meetup === undefined) {
    return <Loader />;
  }

  if (meetup === null) {
    return <NotFoundPage />;
  }

  let image: string | null = null;
  if (!!id) {
    image = localStorage.getItem(id);
  }

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
        <MeetupHeader meetup={meetup} image={image} />
        <MeetupTimePlace meetup={meetup} />
        <MeetupAuthor meetup={meetup} />
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
        <MeetupVotedUsers votedUsers={votedUsers} />
        <MeetupActions meetup={meetup} id={id} />
      </div>
    </section>
  );
};
