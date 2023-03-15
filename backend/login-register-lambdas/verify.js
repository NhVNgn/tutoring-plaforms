const util = require('./utils');


function verify(request) {
  if (!request.user || !request.user.username || !request.token) {
    return util.buildResponse(401, {
      verified: false,
      message: 'incorrect request body'
    })
  }

  const user = request.user;
  const token = request.token;  
  const result = util.verifyToken(user.username, token);
  if (!result.verified) {
    return util.buildResponse(401, result);
  }

  return util.buildResponse(200, {
    verified: true,
    message: 'success',
    user: user,
    token: token
  })
}

module.exports.verify = verify;