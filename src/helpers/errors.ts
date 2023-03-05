export function errorChecker(code: number): string {
  switch (code) {
    case 400:
      alert('Bad request');
      return 'Bad request';
    case 401:
      alert('Unauthorized');
      return 'Unauthorized';
    case 403:
      alert('Forbidden');
      return 'Forbidden';
    case 404:
      alert('Not found');
      return 'Not found';
    case 407:
      alert('Proxy Authentication Required');
      return 'Proxy Authentication Required';
    case 500:
      alert('Internal Server Error');
      return 'Internal Server Error';
    case 501:
      alert('Not Implemented');
      return 'Not Implemented';
    case 502:
      alert('Bad Gateway');
      return 'Bad Gateway';
    case 503:
      alert('Service Unavailable');
      return 'Service Unavailable';
    default:
      alert('Something wrong');
      return 'Something wrong';
  }
}
