import { PropsWithChildren } from 'react';
import { TypographyComponent, Typography } from 'components';
import { MeetupStatus, Meetup } from 'model';
import { FormattedMessage } from 'react-intl';

import styles from './MeetupHeader.module.scss';
import defaultImage from 'assets/images/default-image.jpg';

interface MeetupHeaderProps {
  meetup: Meetup;
  image: string | null;
}

export const MeetupHeader = ({
  meetup,
  image,
}: PropsWithChildren<MeetupHeaderProps>) => {
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
        src={image ? image : defaultImage}
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
