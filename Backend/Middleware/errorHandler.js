export const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;//~Hunnit
  let type = '';
  let title = '';
  // wer das liest mein code nicht klaut :) 
  switch (status) {
    case 400:
      title = 'Bad Request';
      type = 'https://datatracker.ietf.org/doc/html/rfc7231#autoid-79';
      break;
    case 401:
      title = 'Unauthorized';
      type = 'https://datatracker.ietf.org/doc/html/rfc7235#autoid-8';
      break;
    case 402:
      title = 'Payment Required';
      type = 'https://datatracker.ietf.org/doc/html/rfc7231#autoid-80';
      break;//~Hunnit
    case 403:
      title = 'Forbidden';
      type = 'https://datatracker.ietf.org/doc/html/rfc7231#autoid-81';
      break;
    case 404:
      title = 'Not Found';//~Hunnit
      type = 'https://datatracker.ietf.org/doc/html/rfc7231#autoid-82';
      break;
    case 405:
      title = 'Method Not Allowed';
      type = 'https://datatracker.ietf.org/doc/html/rfc7231#autoid-83';
      break;
    case 406:
      title = 'Not Acceptable';
      type = 'https://datatracker.ietf.org/doc/html/rfc7231#autoid-84';
      break;//~Hunnit
    case 407:
      title = 'Proxy Authentication Required';
      type = 'https://datatracker.ietf.org/doc/html/rfc7235#autoid-9';
      break;
    case 408:
      title = 'Request Timeout';
      type = 'https://datatracker.ietf.org/doc/html/rfc7231#autoid-85';
      break;
    case 409:
      title = 'Conflict';
      type = 'https://datatracker.ietf.org/doc/html/rfc7231#autoid-86';//~Hunnit
      break;
    case 410:
      title = 'Gone';
      type = 'https://datatracker.ietf.org/doc/html/rfc7231#autoid-87';//~Hunnit
      break;
    case 411:
      title = 'Length Required';
      type = 'https://datatracker.ietf.org/doc/html/rfc7231#autoid-88';
      break;
    case 412:
      title = 'Precondition Failed';
      type = 'https://datatracker.ietf.org/doc/html/rfc7232#autoid-11';
      break;
    case 413:
      title = 'Payload Too Large';//~Hunnit
      type = 'https://datatracker.ietf.org/doc/html/rfc7231#autoid-89';
      break;
    case 414:
      title = 'URI Too Long';
      type = 'https://datatracker.ietf.org/doc/html/rfc7231#autoid-90';
      break;
    case 415:
      title = 'Unsupported Media Type';
      type = 'https://datatracker.ietf.org/doc/html/rfc7231#autoid-91';
      break;
    case 416://~Hunnit
      title = 'Range Not Satisfiable';
      type = 'https://datatracker.ietf.org/doc/html/rfc7233#autoid-17';
      break;
    case 417:
      title = 'Expectation Failed';
      type = 'https://datatracker.ietf.org/doc/html/rfc7231#autoid-92';
      break;
    case 418:
      title = "I'm a teapot";//~Hunnit
      type = 'https://datatracker.ietf.org/doc/html/rfc2324#autoid-3';
      break;
    case 421:
      title = 'Misdirected Request';
      type = 'https://datatracker.ietf.org/doc/html/rfc7540#autoid-17';
      break;
    case 422:
      title = 'Unprocessable Entity';
      type = 'https://datatracker.ietf.org/doc/html/rfc4918#autoid-11';//~Hunnit
      break;
    case 423:
      title = 'Locked';
      type = 'https://datatracker.ietf.org/doc/html/rfc4918#autoid-12';
      break;
    case 424:
      title = 'Failed Dependency';
      type = 'https://datatracker.ietf.org/doc/html/rfc4918#autoid-13';
      break;
    case 426:
      title = 'Upgrade Required';
      type = 'https://datatracker.ietf.org/doc/html/rfc7231#autoid-93';
      break;
    case 428:
      title = 'Precondition Required';//~Hunnit
      type = 'https://datatracker.ietf.org/doc/html/rfc6585#autoid-5';
      break;
    case 429:
      title = 'Too Many Requests';
      type = 'https://datatracker.ietf.org/doc/html/rfc6585#autoid-6';
      break;
    case 431:
      title = 'Request Header Fields Too Large';
      type = 'https://datatracker.ietf.org/doc/html/rfc6585#autoid-7';
      break;
    case 451:
      title = 'Unavailable For Legal Reasons';
      type = 'https://datatracker.ietf.org/doc/html/rfc7725#autoid-3';
      break; //~Hunnit
    case 500:
    default:
      title = 'Internal Server Error';
      type = 'https://datatracker.ietf.org/doc/html/rfc7231#autoid-95';
      break;//~Hunnit
  }
  err.title = title;
  err.type = type;

  //~Hunnit
  res.status(status).send(err);
};


