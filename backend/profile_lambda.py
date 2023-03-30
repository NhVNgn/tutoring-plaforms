# lambda name: python-lambda-mar-29
# api name: python-mar-29
# api: https://yuibzyvw0j.execute-api.us-east-2.amazonaws.com/dev/userinfo
    # GET: https://yuibzyvw0j.execute-api.us-east-2.amazonaws.com/dev/userinfo?username=
    # POST: https://yuibzyvw0j.execute-api.us-east-2.amazonaws.com/dev/userinfo
        # Include username and new password in body, to update password.
# Make sure the "Handlers" in runtime settings (for the lambda function) is set to
# 'profile_lambda.lambda_handler'

import json
import boto3
sts_client = boto3.client('sts')
sts_response = sts_client.assume_role(RoleArn='arn:aws:iam::897858504723:role/dynamodb-fullaccess',
                                          RoleSessionName='test')
    
my_dynamodb_client = boto3.client('dynamodb', region_name='us-east-2', 
                                  aws_access_key_id=sts_response['Credentials']['AccessKeyId'],
                                  aws_secret_access_key=sts_response['Credentials']['SecretAccessKey'],
                                  aws_session_token=sts_response['Credentials']['SessionToken'])

def get_method(event, context):
    # Tutorial for making a GET method and API gateway stuff: https://www.youtube.com/watch?v=uFsaiEhr1zs
    
    # Parse out query string params first (if GET method):
    username = event['queryStringParameters']['username']

    # Get the user's row from the DB:

    users_table = my_dynamodb_client.scan(TableName='users')['Items']
    row_of_user = next((x for x in users_table if x['username']['S'] == username), 'None found in DB')
    
    # Next, construct the body of the response:
    
    responseBody = {}
    responseBody['username'] = username
    responseBody['message'] = 'henlo'
    responseBody['info_on_user'] = row_of_user
    # responseBody['userData2'] = users_table
    
    # Finally, construct an http response object:
    
    responseObject = {}
    responseObject['statusCode'] = 200
    responseObject['headers'] = {}
    responseObject['headers']['Content-Type'] = 'application/json'
    responseObject['headers']['Access-Control-Allow-Origin'] = '*'
    responseObject['headers']['Access-Control-Allow-Headers'] = '*' # May not be necessary but good to have.
    responseObject['body'] = json.dumps(responseBody)
    
    return responseObject
    
def post_method(event, context):
    # Parse the request body:
    requestBody = json.loads(event['body'])
    username = requestBody['username']

    # Construct the body of the response:
    
    responseBody = {}
    # responseBody['username'] = username
    responseBody['message'] = 'henlo'
    responseBody['username'] = username
    
    # Finally, construct an http response object:
    
    responseObject = {}
    responseObject['statusCode'] = 200
    responseObject['headers'] = {}
    responseObject['headers']['Content-Type'] = 'application/json'
    responseObject['headers']['Access-Control-Allow-Origin'] = '*'
    responseObject['headers']['Access-Control-Allow-Headers'] = '*'
    responseObject['body'] = json.dumps(responseBody)
    
    return responseObject
    
def lambda_handler(event, context):
    # Note: for the associated api gateway, it's important to check "Use Lambda Proxy Integration"
    # for each method. Needed to do event['httpMethod']
    # Also, when adding a method, do 'enable cors' for all methods in the resource, and redeploy the api.
    http_method = event['httpMethod']
    if http_method == 'GET':
        return get_method(event, context)
    elif http_method == 'POST':
        return post_method(event, context)