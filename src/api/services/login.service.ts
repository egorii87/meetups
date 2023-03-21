import { httpClient } from 'helpers';
import { Credentials, User } from 'model';

export const login = async (
  credentials: Credentials,
): Promise<User | boolean> => {
  let resp = await httpClient.post('/login', credentials);
  if (!resp) return false;
  return resp.data.user as User;
};

export const checkLogin = async (): Promise<User | boolean> => {
  let resp = await httpClient.get<User>('/login');
  if (!resp) return false;
  return resp.data as User;
};

export const logout = async (): Promise<void> => {
  await httpClient.get('/logout');
};
