import { FormattedMessage } from 'react-intl';

export interface FormattedDateTime {
  formattedWeekdayShort: JSX.Element;
  formattedWeekdayLong: JSX.Element;
  translatedFormattedDateMonth: JSX.Element | string;
  formattedDateDay: string;
  formattedDate: string;
  formattedTime: string;
}

const formattedWeekdaysShort = [
  <FormattedMessage id="meetupCar.shortDay.sun" defaultMessage="Воскр." />,
  <FormattedMessage id="meetupCar.shortDay.mon" defaultMessage="Пон." />,
  <FormattedMessage id="meetupCar.shortDay.tue" defaultMessage="Вт." />,
  <FormattedMessage id="meetupCar.shortDay.wed" defaultMessage="Ср." />,
  <FormattedMessage id="meetupCar.shortDay.thu" defaultMessage="Четв." />,
  <FormattedMessage id="meetupCar.shortDay.fri" defaultMessage="Пятн." />,
  <FormattedMessage id="meetupCar.shortDay.sat" defaultMessage="Субб." />,
];

const formattedWeekdaysLong = [
  <FormattedMessage id="meetupCar.longDay.sun" defaultMessage="Воскресение" />,
  <FormattedMessage id="meetupCar.longDay.mon" defaultMessage="Понедельник" />,
  <FormattedMessage id="meetupCar.longDay.tue" defaultMessage="Вторник" />,
  <FormattedMessage id="meetupCar.longDay.wed" defaultMessage="Среда" />,
  <FormattedMessage id="meetupCar.longDay.thu" defaultMessage="Четверг" />,
  <FormattedMessage id="meetupCar.longDay.fri" defaultMessage="Пятница" />,
  <FormattedMessage id="meetupCar.longDay.sat" defaultMessage="Суббота" />,
];

const getMonthVariant = (month: string) => {
  switch (month) {
    case 'января':
      return (
        <FormattedMessage id="meetupCar.month.jan" defaultMessage="января" />
      );
    case 'февраля':
      return (
        <FormattedMessage id="meetupCar.month.feb" defaultMessage="февраля" />
      );
    case 'марта':
      return (
        <FormattedMessage id="meetupCar.month.mar" defaultMessage="марта" />
      );
    case 'апреля':
      return (
        <FormattedMessage id="meetupCar.month.apr" defaultMessage="апреля" />
      );
    case 'мая':
      return <FormattedMessage id="meetupCar.month.may" defaultMessage="мая" />;
    case 'июня':
      return (
        <FormattedMessage id="meetupCar.month.jun" defaultMessage="июня" />
      );
    case 'июля':
      return (
        <FormattedMessage id="meetupCar.month.jul" defaultMessage="июля" />
      );
    case 'августа':
      return (
        <FormattedMessage id="meetupCar.month.aug" defaultMessage="августа" />
      );
    case 'сентября':
      return (
        <FormattedMessage id="meetupCar.month.sep" defaultMessage="сентября" />
      );
    case 'октября':
      return (
        <FormattedMessage id="meetupCar.month.oct" defaultMessage="октября" />
      );
    case 'ноября':
      return (
        <FormattedMessage id="meetupCar.month.nov" defaultMessage="ноября" />
      );
    case 'декабря':
      return (
        <FormattedMessage id="meetupCar.month.dec" defaultMessage="декабря" />
      );
    default:
      return '-';
  }
};

const defaultLocale: Intl.LocalesArgument = 'ru-RU';

const defaultDateOptions: Intl.DateTimeFormatOptions = {
  day: 'numeric',
  month: 'long',
};

const defaultTimeOptions: Intl.DateTimeFormatOptions = {
  timeStyle: 'short',
};

export interface DateParserOptions {
  locale?: Intl.LocalesArgument;
  dateOptions?: Intl.DateTimeFormatOptions;
  timeOptions?: Intl.DateTimeFormatOptions;
}

export const parseDateString = (
  dateString: string,
  options?: DateParserOptions,
): FormattedDateTime => {
  const date = new Date(dateString);

  let locale: Intl.LocalesArgument | undefined;
  let dateOptions: Intl.DateTimeFormatOptions | undefined;
  let timeOptions: Intl.DateTimeFormatOptions | undefined;

  ({
    locale = defaultLocale,
    dateOptions = defaultDateOptions,
    timeOptions = defaultTimeOptions,
  } = options ?? {});

  const formattedWeekdayShort = formattedWeekdaysShort[date.getDay()];
  const formattedWeekdayLong = formattedWeekdaysLong[date.getDay()];
  const formattedDate = date.toLocaleDateString(locale, dateOptions);
  const [formattedDateDay, formattedDateMonth] = formattedDate.split(' ');
  const translatedFormattedDateMonth = getMonthVariant(formattedDateMonth);
  const formattedTime = date.toLocaleTimeString(locale, timeOptions);

  return {
    formattedWeekdayShort,
    formattedWeekdayLong,
    formattedDateDay,
    translatedFormattedDateMonth,
    formattedDate,
    formattedTime,
  };
};
