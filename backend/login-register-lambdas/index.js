const mainPath = '/'
const homePath = '/home';
const registerPath = '/register';
const loginPath = '/login';
const verifyPath = '/verify';
const mypagePath = '/mypage';
const util = require('./utils')

const registerService = require('./register')
const loginService = require('./login')
const verifyService = require('./verify')
const getAllUserService = require('./allUsers')


exports.handler = async (event) => {
  console.log('Print Event:', event);
  let response;
  switch (true) {
    case event.httpMethod === 'GET' && event.path === mainPath:
      response = await getAllUserService.getAllUsers();
      break;
    case event.httpMethod === 'GET' && event.path === homePath:
      response = util.buildResponse(200);
      break;
    case event.httpMethod === 'POST' && event.path === registerPath:
      const registerBody = JSON.parse(event.body)
      response = await registerService.register(registerBody)
      break;
    case event.httpMethod === 'POST' && event.path === loginPath:
      const loginBody = JSON.parse(event.body)
      response = await loginService.login(loginBody)
      break;
    case event.httpMethod === 'POST' && event.path === mypagePath:
      const verifyBody = JSON.parse(event.body)
      response = await verifyService.verify(verifyBody);
      break;
    default:
      response = util.buildResponse(404, '404 Not Found');
  }
  return response;
};

