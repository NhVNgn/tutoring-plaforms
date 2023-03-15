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

  const token = util.generateJSONToken(usernameAndEmail)

  return util.buildResponse(200, { username: usernameAndEmail.username, token });
};

module.exports = {
  login
}