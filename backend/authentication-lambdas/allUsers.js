const DynamoDB = require('aws-sdk/clients/dynamodb')
const util = require('./utils');
const bcrypt = require('bcryptjs');


const dynamoDB = new DynamoDB.DocumentClient();
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
    console.log(error)
    response = util.buildResponse(500, 'Error getting all users: ', error, " END.");
  }
  // console.log("response: " + JSON.stringify(response))
  return response
};


module.exports = {
  getAllUsers
}