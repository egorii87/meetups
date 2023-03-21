import { render, screen, act } from '@testing-library/react';
import { SupportButton } from '../SupportButton';
import { IntlProvider } from 'react-intl';
import { httpClient } from 'helpers';
import { userStore } from 'stores';
import { ShortUser, UserRole } from 'model';

jest.mock('axios', () => {
  return {
    create: jest.fn(() => ({
      interceptors: {
        request: { use: jest.fn(), eject: jest.fn() },
        response: { use: jest.fn(), eject: jest.fn() },
      },
      push: jest.fn(),
    })),
  };
});

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

userStore.user = {
  id: '11111',
  name: 'Nik',
  surname: 'Testov',
  post: 'Developer',
  roles: UserRole.EMPLOYEE,
};

const resp = { data: votedList };

const resultResp = {
  data: votedList.push(userStore.currentShortUser as ShortUser),
};

test('support meetup', async () => {
  httpClient.get = jest.fn().mockReturnValue(resp);

  render(
    <IntlProvider locale="en">
      <SupportButton id="aaa" />
    </IntlProvider>,
  );

  const supported = screen.getByTestId('supportButton');

  expect(supported).toHaveTextContent('Поддержать');

  await act(() => {
    httpClient.post = jest.fn().mockReturnValue(resultResp);
    supported.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });

  expect(supported).toHaveTextContent('Поддерживаете');
});
