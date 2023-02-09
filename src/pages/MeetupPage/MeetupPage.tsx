import { Typography, MeetupStagesTabs, TypographyComponent } from 'components';
import { FormattedMessage } from 'react-intl';

import styles from './MeetupPage.module.scss';

export const MeetupPage = () => {
  return (
    <div>
      <Typography
        component={TypographyComponent.Heading1}
        className={styles.heading}
      >
        <FormattedMessage id="meetups.tabs.header" defaultMessage="Митапы" />
      </Typography>
      <MeetupStagesTabs />
    </div>
  );
};
