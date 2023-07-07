import { meetupStore } from 'stores';
import { httpClient } from 'helpers';
import { ShortUser, NewMeetup, UserRole } from 'model';
import { userStore } from 'stores';

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

const meetups = [
  {
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
    status: 'CONFIRMED',
    isOver: false,
    meta: {},
  },
  {
    id: '2e918916-3807-4b6b-bc69-bde70ddf780e',
    modified: '2022-03-13T18:15:45.146Z',
    start: '2023-05-02T10:24:56.600Z',
    finish: '2023-05-02T11:43:56.600Z',
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
    subject: 'Advanced solution-oriented superstructure',
    excerpt:
      'Ipsam voluptatibus cupiditate. Aliquid quod ex quia quia consequuntur. Ullam illo veritatis et et facere non voluptate autem. Libero voluptas ut qui quaerat dicta omnis eos voluptatem in.',
    place: '056 Schaefer Meadow',
    goCount: 33,
    status: 'DRAFT',
    isOver: false,
    meta: {},
  },
  {
    id: 'f3f6bc86-a56f-477e-8712-b490cf91936a',
    modified: '2023-03-12T19:56:08.961Z',
    start: '2023-03-19T21:00:00.000Z',
    finish: '2023-03-19T22:00:00.000Z',
    author: {
      id: 'uuu-bbb',
      name: 'chief',
      surname: 'Blick',
    },
    speakers: [
      {
        id: 'e362fe03-b5f5-4974-b9de-dbdda354bebf',
        name: 'Lexie',
        surname: 'Powlowski',
      },
    ],
    subject: 'New title',
    excerpt: 'Description',
    place: 'Online',
    goCount: 0,
    status: 'CONFIRMED',
    isOver: false,
    image: {
      path: 'nature.jpeg',
      url: 'blob:http://localhost:3000/d2c86107-04f6-415d-ad3b-7f47ebd90fda',
    },
    votedUsers: [],
  },
  {
    id: 'd16e06a7-b0f4-4b1c-854a-db81b75df98a',
    modified: '2023-03-15T18:18:21.362Z',
    start: '2023-03-20T09:00:00.000Z',
    finish: '2023-03-20T10:30:00.000Z',
    author: {
      id: 'uuu-aaa',
      name: 'employee',
      surname: 'Gerlach',
    },
    speakers: [
      {
        id: 'df963334-d402-4ecd-80b9-5d8570f3a5e3',
        name: 'employee',
        surname: 'Gerlach',
      },
    ],
    subject: 'New title',
    excerpt: 'Any description',
    place: 'Online',
    goCount: 0,
    status: 'REQUEST',
    isOver: false,
    image: 'blob:http://localhost:3000/c51417a5-9573-442f-8b43-07dc84867a40',
  },
  {
    id: 'f8f06e39-7c24-4a8a-9ff8-65654945fcb5',
    modified: '2023-03-15T18:19:24.492Z',
    start: '2023-03-20T09:00:00.000Z',
    finish: '2023-03-20T10:30:00.000Z',
    author: {
      id: 'uuu-aaa',
      name: 'employee',
      surname: 'Gerlach',
    },
    speakers: [
      {
        id: 'fff57f97-4dc8-4a84-94e6-390f18f3f047',
        name: 'employee',
        surname: 'Gerlach',
      },
    ],
    subject: 'New title',
    excerpt: 'Any description',
    place: 'Online',
    goCount: 0,
    status: 'REQUEST',
    isOver: false,
    image: 'blob:http://localhost:3000/6f6d33ff-c5c6-418d-82f3-c1ce6a006f89',
  },
];

const resp = { data: meetups };

test('should fetch meetups', async () => {
  httpClient.get = jest.fn().mockReturnValue(resp);
  await meetupStore.init();
  expect(meetupStore.meetups[0].id).toEqual('aaa-aaa-aaa-aaa');
  expect(meetupStore.meetups.length).toEqual(5);
});

test('should delete meetup', async () => {
  httpClient.get = jest.fn().mockReturnValue(resp);
  await meetupStore.init();
  expect(meetupStore.meetups.length).toEqual(5);

  httpClient.delete = jest.fn().mockReturnValue(true);
  await meetupStore.delete('aaa-aaa-aaa-aaa');
  expect(meetupStore.meetups.length).toEqual(5);
});

test('get topics', async () => {
  httpClient.get = jest.fn().mockReturnValue(resp);
  await meetupStore.init();
  expect(meetupStore.meetups.length).toEqual(5);
  expect(meetupStore.getTopics.length).toEqual(1);
});

test('get finished meetups', async () => {
  httpClient.get = jest.fn().mockReturnValue(resp);
  await meetupStore.init();
  expect(meetupStore.meetups.length).toEqual(5);
  expect(meetupStore.getFinished.length).toEqual(2);
});

test('get future meetups', async () => {
  httpClient.get = jest.fn().mockReturnValue(resp);
  await meetupStore.init();
  expect(meetupStore.meetups.length).toEqual(5);
  expect(meetupStore.getOnModeration.length).toEqual(2);
});

test('get upcoming meetups', async () => {
  httpClient.get = jest.fn().mockReturnValue(resp);
  await meetupStore.init();
  expect(meetupStore.meetups.length).toEqual(5);
  expect(meetupStore.getUpcoming.length).toEqual(0);
});

test('should create meetup', async () => {
  httpClient.get = jest.fn().mockReturnValue(resp);
  await meetupStore.init();
  expect(meetupStore.meetups.length).toEqual(5);

  const dateModified = new Date();
  const authorMeetup: ShortUser = {
    id: 'uuu-aaa',
    name: 'employee',
    surname: 'Gerlach',
  };

  const meetup: NewMeetup = {
    modified: dateModified.toJSON(),
    author: authorMeetup,
    subject: 'ITS NEW METTUP FROM TEST',
    place: 'jest',
    speakers: [authorMeetup],
  };
  httpClient.post = jest.fn().mockResolvedValue(resp);
  await meetupStore.create(meetup);

  expect(meetupStore.meetups.length).toEqual(6);
});

test('should approve meetup', async () => {
  const approvingMeetup = {
    id: 'd16e06a7-b0f4-4b1c-854a-db81b75df98a',
    modified: '2023-03-15T18:18:21.362Z',
    start: '2023-03-20T09:00:00.000Z',
    finish: '2023-03-20T10:30:00.000Z',
    author: {
      id: 'uuu-aaa',
      name: 'employee',
      surname: 'Gerlach',
    },
    speakers: [
      {
        id: 'df963334-d402-4ecd-80b9-5d8570f3a5e3',
        name: 'employee',
        surname: 'Gerlach',
      },
    ],
    subject: 'New title',
    excerpt: 'Any description',
    place: 'Online',
    goCount: 0,
    status: 'REQUEST',
    isOver: false,
    image: 'blob:http://localhost:3000/c51417a5-9573-442f-8b43-07dc84867a40',
  };
  const resp = { data: approvingMeetup };
  httpClient.get = jest.fn().mockReturnValue(resp);
  await meetupStore.init();

  const approvedMeetup = {
    id: 'd16e06a7-b0f4-4b1c-854a-db81b75df98a',
    modified: '2023-03-15T18:18:21.362Z',
    start: '2023-03-20T09:00:00.000Z',
    finish: '2023-03-20T10:30:00.000Z',
    author: {
      id: 'uuu-aaa',
      name: 'employee',
      surname: 'Gerlach',
    },
    speakers: [
      {
        id: 'df963334-d402-4ecd-80b9-5d8570f3a5e3',
        name: 'employee',
        surname: 'Gerlach',
      },
    ],
    subject: 'New title',
    excerpt: 'Any description',
    place: 'Online',
    goCount: 0,
    status: 'CONFIRMED',
    isOver: false,
    image: 'blob:http://localhost:3000/c51417a5-9573-442f-8b43-07dc84867a40',
  };
  const res = { data: approvedMeetup };
  httpClient.put = jest.fn().mockReturnValue(res);
  let approved = await meetupStore.approve(
    'd16e06a7-b0f4-4b1c-854a-db81b75df98a',
  );
  expect(approved.status).toEqual('CONFIRMED');
});

test('returns information about whether the current user voted for the meetup (true)', async () => {
  let votedList = [
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
    name: 'Lisa',
    surname: 'Gorczany',
    post: 'Developer',
    roles: UserRole.EMPLOYEE,
  };
  let voted = meetupStore.votedThisMeetup(votedList);
  expect(voted).toEqual(true);
});

test('returns information about whether the current user voted for the meetup (false)', async () => {
  let votedList = [
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
    id: '55555',
    name: 'Virgil',
    surname: 'Tromp',
    post: 'Developer',
    roles: UserRole.EMPLOYEE,
  };
  const voted = meetupStore.votedThisMeetup(votedList);
  expect(voted).toEqual(false);
});
