import { render, screen } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { MeetupVotedUsers } from '../MeetupVotedUsers';
import languages_ru from '../../../lang/ru.json';
import languages_en from '../../../lang/en.json';
import languages_ua from '../../../lang/ua.json';

const votedList = [
  {
    id: '11111',
    name: 'Lisa',
    surname: 'Gorczany',
  },
  {
    id: '22222',
    name: 'Stanley',
    surname: 'Carroll',
  },
  {
    id: '33333',
    name: 'Heather',
    surname: 'Daugherty',
  },
];

describe('render voted users', () => {
  it('testing the field name', () => {
    const languages = {
      ru: languages_ru,
      en: languages_en,
      ua: languages_ua,
    };

    const language = 'ru';

    render(
      <IntlProvider
        locale={navigator.language}
        messages={languages[language as keyof typeof languages]}
      >
        <MeetupVotedUsers votedUsers={votedList} />
      </IntlProvider>,
    );
    expect(screen.getByTestId('meetupVotedLabel')).toHaveTextContent(
      'Поддерживают',
    );
  });

  it('testing the field name and users', () => {
    const languages = {
      ru: languages_ru,
      en: languages_en,
      ua: languages_ua,
    };

    const language = 'en';

    render(
      <IntlProvider
        locale={navigator.language}
        messages={languages[language as keyof typeof languages]}
      >
        <MeetupVotedUsers votedUsers={votedList} />
      </IntlProvider>,
    );
    expect(screen.getByTestId('meetupVotedLabel')).toHaveTextContent('Support');
    expect(screen.getByTestId('meetupVotedUsers')).toHaveTextContent('LGSCHD');
  });
});
