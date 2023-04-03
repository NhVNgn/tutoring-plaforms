import json
import boto3

def lambda_handler(event, context):
    # retrieve username from query parameters
    username = event['queryStringParameters']['username']
    
    # create DynamoDB client and table resource
    dynamodb = boto3.client('dynamodb')
    table_name = 'Enrolled'
    table = boto3.resource('dynamodb').Table(table_name)
    
    # query table to get all enrolled courses for user
    response = table.query(
        KeyConditionExpression='username = :username',
        ExpressionAttributeValues={
            ':username': username
        },
        ProjectionExpression='courseID'
    )

    # extract courseIDs from response
    items = response['Items']
    
    # return response
    if len(items) > 0:
        response = {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps(items)
        }
    else:
        response = {
            'statusCode': 404,
            'headers': {
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'message': f'{username} has no enrolled courses.'})
        }
    
    return response
