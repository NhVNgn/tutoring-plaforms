import json
import boto3
from botocore.exceptions import ClientError

dynamodb = boto3.resource('dynamodb')
table_name = 'Bookmarks'
table = dynamodb.Table(table_name)

def lambda_handler(event, context):
    http_method = event['httpMethod']
    
    # If the request is a GET, retrieve data from the bookmarks table
    if http_method == 'GET':
        username = event['queryStringParameters']['username']
        
        try:
            response = table.query(
                KeyConditionExpression='username = :username',
                ExpressionAttributeValues={
                    ':username': username
                },
                ProjectionExpression='courseID, courseName, description, price'
            )
            items = response['Items']
            return {
                'statusCode': 200,
                'headers': {
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps(items)
            }
        except ClientError as e:
            return {
                'statusCode': 400,
                'body': e.response['Error']['Message']
            }
            
    # If the request is a POST, store data in the bookmarks table
    elif http_method == 'POST':
        data = json.loads(event['body'])
        username = data['username']
        courseID = data['courseID']
        
        try:
            response = table.put_item(
                Item={
                    'username': username,
                    'courseID': courseID
                }
            )
            return {
                'statusCode': 200,
                'body': 'Data stored successfully in DynamoDB'
            }
        except ClientError as e:
            return {
                'statusCode': 400,
                'body': e.response['Error']['Message']
            }
            
     # If the request is a DELETE, delete the specified courseID for the given username
    elif http_method == 'DELETE':
        data = json.loads(event['body'])
        username = data['username']
        courseID = data['courseID']
        
        try:
            response = table.delete_item(
                Key={
                    'username': username,
                    'courseID': courseID
                }
            )
            return {
                'statusCode': 200,
                'body': 'Data deleted successfully from DynamoDB'
            }
        except ClientError as e:
            return {
                'statusCode': 400,
                'body': e.response['Error']['Message']
            }
            
    # If the request is neither a GET nor a POST, return an error
    else:
        return {
            'statusCode': 400,
            'body': 'Unsupported HTTP method'
    }

    # api: https://v9v2zwoza6.execute-api.us-east-2.amazonaws.com/prod/bookmarks/username=? for GET Request
    # api: https://v9v2zwoza6.execute-api.us-east-2.amazonaws.com/prod/bookmarks/username=?&courseID=? for DELETE Request
    # DATABASE tableName: Bookmarks
    # Fields: username, courseID, courseName, description, price
