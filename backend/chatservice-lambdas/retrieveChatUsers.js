import boto3
import json
from botocore.exceptions import ClientError

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('ChatMessages')

def lambda_handler(event, context):
    try:
        user1 = event['queryStringParameters']['user1']
        response = table.scan(
            FilterExpression='user1 = :user1',
            ExpressionAttributeValues={
                ':user1': user1
            }
        )
        items = response['Items']
        users_list = []
        for item in items:
            if item['user2'] not in users_list:
                users_list.append(item['user2'])
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'users_list': users_list})
        }
    except ClientError as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': str(e)})
        }
