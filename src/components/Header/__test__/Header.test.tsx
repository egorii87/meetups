import { render, fireEvent, screen } from '@testing-library/react';
import { Header } from '../Header';
import { BrowserRouter } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import languages_ru from '../../../lang/ru.json';
import languages_en from '../../../lang/en.json';
import languages_ua from '../../../lang/ua.json';

describe('when rendered prop', () => {
  it('should paste it into the greetings text', () => {
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
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </IntlProvider>,
    );
    expect(screen.getByTestId('meetups')).toHaveTextContent('Meetups');
  });
});

describe('when prop', () => {
  it('should paste it into the greetings text', () => {
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
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </IntlProvider>,
    );
    expect(screen.getByTestId('meetups')).toHaveTextContent('Митапы');
  });
});
