import { render, screen } from '@testing-library/react';
import { MeetupStatus } from 'model';
import { IntlProvider } from 'react-intl';
import { MeetupAuthor } from '../MeetupAuthor';
import languages_ru from '../../../lang/ru.json';
import languages_en from '../../../lang/en.json';
import languages_ua from '../../../lang/ua.json';

const meetup = {
  id: 'aaa-aaa-aaa-aaa',
  modified: '2021-08-27T04:38:33.816Z',
  start: '2022-06-09T23:35:47.068Z',
  finish: '2022-06-10T02:51:47.068Z',
  author: {
    id: 'uuu-aaa',
    name: 'employee',
    surname: 'Gerlach',
  },
  speakers: [
    {
      id: 'uuu-aaa',
      name: 'employee',
      surname: 'Gerlach',
    },
  ],
  subject: 'Reverse-engineered even-keeled standardization',
  excerpt:
    'Nemo pariatur dolores ut vero velit non. Quidem temporibus quod nihil amet recusandae atque provident voluptatum iste. Aut architecto cum sit rerum aliquam maxime. Ratione voluptate optio id molestias quia quidem ipsam. Eius voluptatem quia dolores enim assumenda. Consequuntur cupiditate error earum hic est numquam vero.',
  place: '630 Goyette Causeway',
  goCount: 64,
  status: MeetupStatus.CONFIRMED,
  isOver: false,
  meta: {},
};

describe('render meetup author', () => {
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
        <MeetupAuthor meetup={meetup} />
      </IntlProvider>,
    );

    expect(screen.getByTestId('meetupAuthorLabel')).toHaveTextContent('Спикер');
  });

  it('testing the field name and author', () => {
    meetup.status = MeetupStatus.DRAFT;

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
        <MeetupAuthor meetup={meetup} />
      </IntlProvider>,
    );

    expect(screen.getByTestId('meetupAuthorLabel')).toHaveTextContent('Author');
    expect(screen.getByTestId('meetupAuthorText')).toHaveTextContent(
      'EGemployee Gerlach',
    );
  });
});
