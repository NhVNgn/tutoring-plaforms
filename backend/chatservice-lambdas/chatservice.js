import json
import time
import boto3
from botocore.exceptions import ClientError

dynamodb = boto3.resource('dynamodb')
table_name = 'ChatMessages'
table = dynamodb.Table(table_name)

cors_headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Methods': '*'
}

def lambda_handler(event, context):
    http_method = event['httpMethod']
    if http_method == 'POST':
        data = json.loads(event['body'])
        sender = data['user1']
        recipient = data['user2']
        message = data['message']
        timestamp = int(time.time())
        try:
            table.put_item(
                Item={
                    'user1': sender,
                    'user2': recipient,
                    'message': message,
                    'timestamp': timestamp
                }
            )
            response_body = {
                'message': 'Message stored successfully'
            }
            return {
                'statusCode': 200,
                'headers': {
                    'Access-Control-Allow-Origin': '*'
                    },
                'body': json.dumps(response_body)
            }
        except ClientError as e:
            response_body = {
                'error': str(e)
            }
            return {
                'statusCode': 400,
                'headers': cors_headers,
                'body': response_body
            }
    elif http_method == 'GET':
        user1 = event['queryStringParameters']['user1']
        user2 = event['queryStringParameters']['user2']
        try:
            response = table.scan(
                FilterExpression='user1 = :user1 or user2 = :user2 or user1 = :user2 or user2 = :user1',
                ExpressionAttributeValues={
                    ':user1': user1,
                    ':user2': user2
                }
            )
            items = response['Items']
            sorted_items = sorted(items, key=lambda item: item['timestamp'])
            filtered_items = [item for item in sorted_items if item['user1'] == user1 and item['user2'] == user2 or item['user1'] == user2 and item['user2'] == user1]
            for item in filtered_items:
                item['timestamp'] = time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(item['timestamp']))
            return {
                'statusCode': 200,
                'headers': cors_headers,
                'body': json.dumps(filtered_items)
            }
        except ClientError as e:
            return {
                'statusCode': 400,
                'headers': cors_headers,
                'body': str(e)
            }