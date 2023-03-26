const DynamoDB = require('aws-sdk/clients/dynamodb')
const util = require('./utils');
const uuid = require('uuid')


const dynamoDB = new DynamoDB.DocumentClient();
const sessionTableName = 'session'
const sessionDuration = 2 * 60 * 60 * 1000;



const getSession = async (sessionID) => {
  const params = {
    TableName: sessionTableName,
    Key: {
      sessionID: sessionID
    }
  };

  try {
    const response = await dynamoDB.get(params).promise();
    return response.Item;
  } catch (error) {
    console.error('Error getting sessionID: ', error);
  }
}


const verifySessionID = async (sessionID, username) => {
  const db_session = await getSession(sessionID);

  if (!db_session) {
    console.log('No session record found');
    return {
      verified: false,
      message: 'No session record found'
    }
  }

  if (db_session.username != username) {
    console.log('unauthorized access')
    return {
      verified: false,
      message: 'unauthorized access'
    }
  }

  return {
    verified: true,
    message: 'verified'
  }


}
const verify = async (body) => {
  // in production sessionID should be contained in the cookies instead of the body of the request 
  const { sessionID, username } = body

  if (!username || !sessionID) {
    return util.buildResponse(401, {
      verified: false,
      message: 'missing field in request'
    })
  }

  const result = await verifySessionID(sessionID, username);
  if (!result.verified) {
    return util.buildResponse(401, result.message);
  }

  return util.buildResponse(200, {
    verified: true,
    message: 'success',
    username: username,
    sessionID: sessionID
  })
}

module.exports.verify = verify;