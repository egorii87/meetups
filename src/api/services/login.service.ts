import { httpClient } from 'helpers';
import { Credentials, User } from 'model';

export const login = async (
  credentials: Credentials,
): Promise<User | boolean> => {
  try {
    const resp = await httpClient.post('/login', credentials);
    return resp.data.user as User;
  } catch {
    return false;
  }
};

export const checkLogin = async (): Promise<User | boolean> => {
  try {
    const { data: authenticatedUser } = await httpClient.get<User>('/login');
    return authenticatedUser;
  } catch {
    return false;
  }
};

export const logout = async (): Promise<void> => {
  await httpClient.get('/logout');
};
