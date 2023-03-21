import { NotificationVariant, notification } from 'components';

export function errorChecker(code: number) {
  let errorText: string = 'Something wrong';

  switch (code) {
    case 400:
      errorText = 'Bad request';
      break;
    case 403:
      errorText = 'Forbidden';
      break;
    case 404:
      errorText = 'Not found';
      break;
    case 407:
      errorText = 'Proxy Authentication Required';
      break;
    case 500:
      errorText = 'Internal Server Error';
      break;
    case 501:
      errorText = 'Not Implemented';
      break;
    case 502:
      errorText = 'Bad Gateway';
      break;
    case 503:
      errorText = 'Service Unavailable';
      break;
  }
  return notification(NotificationVariant.Error, errorText);
}
