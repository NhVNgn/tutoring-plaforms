const AWS = require('aws-sdk');
const util = require('./utils');
const bcrypt = require('bcryptjs');

AWS.config.update({
  region: 'us-east-2'
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const userTableName = 'users';

const getAllUsers = async (body) => {

  let response = "no response";
  const params = {
    TableName: userTableName,
  };

  try {
    const result = await dynamoDB.scan(params).promise();
    response = util.buildResponse(200, result.Items);

  } catch (error) {
    response = util.buildResponse(500, 'Error getting all users');
  }
  return response
};


module.exports = {
  getAllUsers
}