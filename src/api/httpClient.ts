import { API_BASE_URL } from 'api/constants';
import axios, { AxiosResponse } from 'axios';
import { errorChecker } from 'helpers';

export const httpClient = axios.create({
  baseURL: API_BASE_URL,
});

httpClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    if (error.response.status !== 401) {
      errorChecker(error.response.status);
      console.log(error);
      throw error;
    }
  },
);
