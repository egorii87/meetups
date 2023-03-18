import { render, fireEvent, screen } from '@testing-library/react';
import { SupportButton } from './SupportButton';
import { IntlProvider } from 'react-intl';
import { httpClient } from 'helpers';
import { meetupStore, userStore } from 'stores';
import { UserRole } from 'model';

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

const resp = { data: votedList };

test('increments counter', () => {
  userStore.user = {
    id: '11111',
    name: 'Lisa',
    surname: 'Gorczany',
    post: 'Developer',
    roles: UserRole.EMPLOYEE,
  };
  // render the component on virtual dom

  httpClient.post = jest.fn().mockReturnValue(resp);
  httpClient.get = jest.fn().mockReturnValue(false);
  meetupStore.votedThisMeetup(votedList);
  render(
    <IntlProvider locale="en">
      <SupportButton id="aaa" />
    </IntlProvider>,
  );

  //select the elements you want to interact with
  const supported = screen.getByTestId('supportBuuton');
  /* const votesCount = screen.getByTestId("votesCount");
  expect(votesCount).toHaveTextContent("qwe"); */
  expect(supported).toHaveTextContent('Поддержать');
  // const incrementBtn = screen.getByTestId("increment");

  //interact with those elements
  fireEvent.click(supported);
  expect(supported).toHaveTextContent('Поддерживаете');

  //assert the expected result
});
