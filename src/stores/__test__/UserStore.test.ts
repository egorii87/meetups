import { userStore } from 'stores';
import { httpClient } from 'helpers';
import { User } from 'model';

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

const userChiefData = {
  user: {
    id: 'uuu-bbb',
    name: 'chief',
    password: 'private',
    surname: 'Blick',
    post: 'Chief developer',
    roles: 'CHIEF',
  },
};

const userEmployeeData = {
  user: {
    id: 'uuu-aaa',
    name: 'employee',
    password: 'private',
    surname: 'Gerlach',
    post: 'Developer',
    roles: 'EMPLOYEE',
  },
};

const usersList = [
  {
    id: '92ec9d5c-5d2a-41c8-a78c-6017ea1315a4',
    name: 'Leonie',
    password: 'private',
    surname: 'Glover',
    post: 'Chief Tactics Consultant',
    roles: 'EMPLOYEE',
  },
  {
    id: 'd1edd4b1-7710-4e02-9a70-9a71a9f14120',
    name: 'Heather',
    password: 'private',
    surname: 'Daugherty',
    post: 'Regional Metrics Associate',
    roles: 'EMPLOYEE',
  },
  {
    id: 'fbcc2345-516b-480c-a618-77ad150cb088',
    name: 'Virgil',
    password: 'private',
    surname: 'Tromp',
    post: 'Central Accountability Producer',
    roles: 'EMPLOYEE',
  },
];

const respChief = { data: userChiefData };
const respEmployee = { data: userEmployeeData };
const respUsers = { data: usersList };

const loginChiefData = {
  username: 'chief',
  password: 'private',
};

const loginEmployData = {
  username: 'employee',
  password: 'private',
};

test('should login', async () => {
  httpClient.post = jest.fn().mockReturnValue(respChief);
  await userStore.login(loginChiefData);
  const user = userStore.currentUser as User;

  expect(user.id).toEqual('uuu-bbb');
  expect(user.roles).toEqual('CHIEF');
});

test('should logout', async () => {
  httpClient.post = jest.fn().mockReturnValue(respChief);
  await userStore.login(loginChiefData);
  const user = userStore.currentUser as User;

  expect(user.id).toEqual('uuu-bbb');
  expect(user.roles).toEqual('CHIEF');

  httpClient.get = jest.fn();
  await userStore.logout();

  expect(userStore.currentUser).toEqual(undefined);
});

test('should check the login or not', async () => {
  httpClient.get = jest.fn().mockReturnValue(undefined);
  let result = await userStore.checkLogin();

  expect(result).toEqual(false);

  httpClient.post = jest.fn().mockReturnValue(respChief);
  await userStore.login(loginChiefData);

  httpClient.get = jest.fn().mockReturnValue(respChief);
  result = await userStore.checkLogin();

  expect(typeof result).toEqual('object');
});

test('should returns that the user has chief permissions', async () => {
  httpClient.post = jest.fn().mockReturnValue(respChief);
  await userStore.login(loginChiefData);

  const result = userStore.hasChiefPermission();
  expect(result).toEqual(true);
});

test('return the user does not have the chief permissions', async () => {
  httpClient.post = jest.fn().mockReturnValue(respEmployee);
  await userStore.login(loginEmployData);

  const result = userStore.hasChiefPermission();
  expect(result).toEqual(false);
});

test('should check whether the user has permissions to create a meetup (true)', async () => {
  httpClient.post = jest.fn().mockReturnValue(respChief);
  await userStore.login(loginChiefData);

  const result = userStore.hasPermissionToCreateMeetup();
  expect(result).toEqual(true);
});

test('should check whether the user has permissions to create a meetup (false)', async () => {
  httpClient.get = jest.fn();
  await userStore.logout();
  const result = userStore.hasPermissionToCreateMeetup();

  expect(result).toEqual(false);
});

test('should check whether the user has permissions to interact (true)', async () => {
  httpClient.post = jest.fn().mockReturnValue(respEmployee);
  await userStore.login(loginEmployData);
  const result = userStore.hasPermissionToInteract('uuu-aaa');

  expect(result).toEqual(true);
});

test('should check whether the user has permissions to interact (false)', async () => {
  httpClient.post = jest.fn().mockReturnValue(respEmployee);
  await userStore.login(loginEmployData);
  const result = userStore.hasPermissionToInteract('qqq-mmm');

  expect(result).toEqual(false);
});

test('should return current short user', async () => {
  httpClient.post = jest.fn().mockReturnValue(respEmployee);
  await userStore.login(loginEmployData);

  const currentShortUser = userStore.currentShortUser;
  const countOfKeys = Object.keys(currentShortUser as User).length;

  expect(countOfKeys).toEqual(3);
});

test('should init users list', async () => {
  httpClient.get = jest.fn().mockReturnValue(respUsers);
  await userStore.initUsersList();

  expect(userStore.usersList.length).toEqual(3);
});

test('should return author list', async () => {
  httpClient.get = jest.fn().mockReturnValue(respUsers);
  await userStore.initUsersList();
  const authorList = userStore.getAuthorList;

  expect(authorList[0].value.id).toEqual(
    '92ec9d5c-5d2a-41c8-a78c-6017ea1315a4',
  );
  expect(authorList[1].label).toEqual('Heather Daugherty');
});

test('should return current author for select meetup author', async () => {
  httpClient.post = jest.fn().mockReturnValue(respChief);
  await userStore.login(loginChiefData);
  const user = userStore.getCurrentAuthorList;

  expect(user?.label).toEqual('chief Blick');
});

test('should return undefined for select meetup author', async () => {
  httpClient.get = jest.fn();
  await userStore.logout();
  const user = userStore.getCurrentAuthorList;

  expect(user).toEqual(undefined);
});
