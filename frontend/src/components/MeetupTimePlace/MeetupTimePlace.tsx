import { PropsWithChildren } from 'react';
import { TypographyComponent, Typography } from 'components';
import { MeetupStatus, Meetup } from 'model';
import { parseDateString } from 'helpers';
import { FormattedMessage } from 'react-intl';

import styles from './MeetupTimePlace.module.scss';
import calendar from './assets/calendar.svg';
import clock from './assets/clock.svg';
import pin from './assets/pin.svg';

interface MeetupTimePlaceProps {
  meetup: Meetup;
}

export const MeetupTimePlace = ({
  meetup,
}: PropsWithChildren<MeetupTimePlaceProps>) => {
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
