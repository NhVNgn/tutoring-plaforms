const AWS = require('aws-sdk');
const util = require('./utils');
const bcrypt = require('bcryptjs');

AWS.config.update({
  region: 'us-east-2'
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const userTableName = 'users';

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

const saveUser = async (user) => {
  const params = {
    TableName: userTableName,
    Item: user
  };

  try {
    await dynamoDB.put(params).promise();
    return true;
  } catch (error) {
    console.error('There is an error saving user: ', error);
  }
};

const register = async (body) => {
  const { username, email, password, role } = body;

  if (!username || !email || !password || !role) {
    return util.buildResponse(401, {
      message: 'Missing field'
    });
  }

  const db_user = await getUser(username.toLowerCase().trim());
  if (db_user && db_user.username) {
    return util.buildResponse(401, {
      message: 'username already exists'
    });
  }

  const hashed_password = bcrypt.hashSync(password.trim(), 10);
  const user = {
    username: username,
    email: email,
    password: hashed_password,
    role: role
  };

  const saveUserResult = await saveUser(user);
  if (!saveUserResult) {
    return util.buildResponse(503, { message: 'Server Error. Try again' });
  }

  return util.buildResponse(200, { username: user.username });
};


module.exports = {
  register
}