import { httpClient } from 'helpers';
import { User } from 'model';

export const getUsers = async (): Promise<User[]> => {
  const { data: users } = await httpClient.get<User[]>('/users');
  return users;
};
