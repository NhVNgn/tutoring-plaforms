const jwt = require('jsonwebtoken');



const generateJSONToken = (usernameAndEmail) => {
  if (!usernameAndEmail)
    return null;


  return jwt.sign(usernameAndEmail, process.env.JWT_KEY, {
    expiresIn: '2h'
  });
}


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


const verifyToken = (username, token) => {
  return jwt.verify(token, process.env.JWT_KEY, (error, response) => {
    if (error) {
      return {
        verified: false,
        message: 'invalid token'
      }
    }

    if (response.username !== username) {
      return {
        verified: false,
        message: 'invalid user'
      }
    }

    return {
      verified: true,
      message: 'verifed'
    }
  })
}


module.exports = {
  generateJSONToken,
  verifyToken,
  buildResponse
}