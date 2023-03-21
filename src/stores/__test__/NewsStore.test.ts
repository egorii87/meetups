import { newsStore } from 'stores';
import { httpClient } from 'helpers';
import { NewNews } from 'model';

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

const news = [
  {
    id: '57d9b34f-7915-4243-a7ad-8358c137faa9',
    publicationDate: '2023-03-15T18:19:36.403Z',
    title: 'New title',
    text: 'Any text',
    image: 'blob:http://localhost:3000/b9c33f15-c8c6-47a3-ae10-de8ec76c310e',
  },
  {
    id: '9ba7c51c-30bb-449e-ba98-f8c6225473cc',
    publicationDate: '2023-03-15T18:18:35.814Z',
    title: 'New title',
    text: 'Any text',
    image: 'blob:http://localhost:3000/085ccb92-4f47-4b93-b9ff-c3d90f33a1f8',
  },
  {
    id: 'bf8e3c6d-2f17-44bc-9bcc-9038a7e0f6d8',
    publicationDate: '2023-03-15T18:17:53.349Z',
    title: 'New title',
    text: 'Any text',
    image: 'blob:http://localhost:3000/33fc29dd-12eb-4a93-96f6-c9f9cc519e89',
  },
  {
    id: '72a04394-5374-4bba-80ba-f4cb03846227',
    publicationDate: '2023-03-15T18:17:06.810Z',
    title: 'New title',
    text: 'Any text',
    image: 'blob:http://localhost:3000/016bcc24-e3ba-4bf1-8353-5e67b406b181',
  },
];

const resp = { data: news };

test('should fetch news', async () => {
  httpClient.get = jest.fn().mockReturnValue(resp);
  await newsStore.init();

  expect(newsStore.news.length).toEqual(4);
  expect(newsStore.news[2].id).toEqual('bf8e3c6d-2f17-44bc-9bcc-9038a7e0f6d8');
});

test('should create news', async () => {
  const createdNews: NewNews = {
    title: 'New news title',
    text: 'New news text',
    image: undefined,
  };

  const newNews = {
    id: '88888888',
    publicationDate: '2023-03-15T18:17:06.810Z',
    title: 'New news title',
    text: 'New news text',
    image: 'blob:http://localhost:3000/016bxcc24-e3ba-4bf1-8353-5e67j496b381',
  };

  const respNewNews = { data: newNews };

  httpClient.get = jest.fn().mockReturnValue(resp);
  await newsStore.init();
  expect(newsStore.news.length).toEqual(4);

  httpClient.post = jest.fn().mockReturnValue(respNewNews);
  const result = await newsStore.create(createdNews);

  expect(newsStore.news.length).toEqual(5);
  expect(result.id).toEqual('88888888');
});

test('should delete one news', async () => {
  httpClient.delete = jest.fn().mockReturnValue(true);
  await newsStore.remove('88888888');
  expect(newsStore.news.length).toEqual(4);
});

test('should not delete one news', async () => {
  httpClient.delete = jest.fn().mockReturnValue(false);
  await newsStore.remove('88888888');
  expect(newsStore.news.length).toEqual(4);
});
