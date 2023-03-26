const DynamoDB = require('aws-sdk/clients/dynamodb')
const util = require('./utils');
const bcrypt = require('bcryptjs');
const uuid = require('uuid')


const dynamoDB = new DynamoDB.DocumentClient();
const userTableName = 'users';
const sessionTableName = 'session'
const sessionDuration = 2 * 60 * 60 * 1000;



const getUser = async (username) => {
  const params = {
    TableName: userTableName,
    Key: {
      username: username
    }
  };

  try {
    const response = await dynamoDB.get(params).promise();
    return response.Item;
  } catch (error) {
    console.error('Error getting user: ', error);
  }
};

const saveSession = async (session) => {
  const params = {
    TableName: sessionTableName,
    Item: session
  };

  try {
    await dynamoDB.put(params).promise();
    return true;
  } catch (error) {
    console.log('Error saving session: ', error)
  }
}

const login = async (body) => {
  const { username, password } = body;

  if (!username || !password) {
    return util.buildResponse(401, {
      message: 'Missing either username or password'
    });
  }

  const db_user = await getUser(username.toLowerCase().trim());
  if (!db_user || !db_user.username) {
    return util.buildResponse(403, {
      message: 'user does not exist'
    });
  }

  if (!bcrypt.compareSync(password, db_user.password)) {
    return util.buildResponse(403, { message: 'password is incorrect' })
  }

  const usernameAndEmail = {
    username: db_user.username,
    email: db_user.email
  }

  const sessionID = uuid.v4();
  const start = new Date();
  const expire = new Date(start.getTime() + sessionDuration);
  const start_str = start.toISOString();
  const expire_str = expire.toISOString();

  // insert into session table
  const session = {
    sessionID: sessionID,
    username: db_user.username,
    start: start_str,
    expire: expire_str
  }
  const saveSessionResult = await saveSession(session);
  if (!saveSessionResult) {
    return util.buildResponse(503, { message: 'Server Error. Try again' });
  }
  console.log("successfully saved session: ", sessionID)


  // Not return sessionID in cookie for now because we have different domain for login endpoint and localhost in testing, which cookies disapears if refreshing the browser.

  /* const sessionData = {
    sessionID: sessionID,
    username: db_user.username,
  };
  const sessionDataStr = JSON.stringify(sessionData);
  const sessionCookie = `sessionData=${sessionDataStr}; HttpOnly; SameSite=None; Secure; Expires=${expire.toGMTString()}`; */



  return util.buildResponse(200, { username: usernameAndEmail.username, sessionID: sessionID, role: db_user.role })
};

module.exports = {
  login
}