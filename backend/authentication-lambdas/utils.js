const buildResponse = (statusCode, body) => {
  return {
    statusCode: statusCode,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  };
};

const buildCookieResponse = (statusCode, body, cookies = []) => {
  const response = {
    statusCode: statusCode,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
      'Access-Control-Allow-Credentials': true,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  };

  if (cookies.length > 0) {
    response.headers['Set-Cookie'] = cookies;
  }

  return response;
};

function parseCookies(cookieHeader) {
  const sessionDataString = cookieHeader.split('=')[1].split(';')[0];
  const sessionData = JSON.parse(sessionDataString);

  return sessionData;
}

module.exports = {
  buildResponse,
  parseCookies,
  buildCookieResponse
};