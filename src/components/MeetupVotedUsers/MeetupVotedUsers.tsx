import { PropsWithChildren } from 'react';
import {
  TypographyComponent,
  Typography,
  UserPreview,
  UserPreviewVariant,
} from 'components';
import { ShortUser } from 'model';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';

import styles from './MeetupVotedUsers.module.scss';

interface MeetupVotedUsersProps {
  votedUsers: ShortUser[];
}

const MAX_PREVIEW_USERS = 8;

export const MeetupVotedUsers = ({
  votedUsers,
}: PropsWithChildren<MeetupVotedUsersProps>) => {
  if (votedUsers?.length === 0) {
    return null;
  }

  const previewVotedUsers = votedUsers.slice(0, MAX_PREVIEW_USERS);

  return (
    <div className={styles.data}>
      <Typography
        component={TypographyComponent.Span}
        className={styles.dataName}
        data-testid="meetupVotedLabel"
      >
        <FormattedMessage
          id="fieldsName.support"
          defaultMessage="Поддерживают"
        />
      </Typography>
      <div
        className={classNames(styles.dataContent, styles.votedUsers)}
        data-testid="meetupVotedUsers"
      >
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
