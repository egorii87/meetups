import { PropsWithChildren } from 'react';
import { TypographyComponent, Typography, UserPreview } from 'components';
import { MeetupStatus, Meetup } from 'model';
import { FormattedMessage } from 'react-intl';

import styles from './MeetupAuthor.module.scss';

interface MeetupAuthorProps {
  meetup: Meetup;
}

export const MeetupAuthor = ({
  meetup,
}: PropsWithChildren<MeetupAuthorProps>) => (
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
