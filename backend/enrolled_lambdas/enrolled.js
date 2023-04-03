import json
import boto3

dynamodb = boto3.resource('dynamodb')
table_name = 'Enrolled'
table = dynamodb.Table(table_name)

def lambda_handler(event, context):
    http_method = event['httpMethod']
    
    if http_method == 'POST':
        data = json.loads(event['body'])
        username = data['username']
        course_id = data['courseID']
        table.put_item(
            Item={
                'username': username,
                'courseID': course_id
            }
        )
        response = {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'message': f'Successfully enrolled {username} in course {course_id}.'})
        }
    elif http_method == 'GET':
        username = event['queryStringParameters']['username']
        course_id = event['queryStringParameters']['courseID']
        response = table.scan(
            FilterExpression='username = :u and courseID = :c',
            ExpressionAttributeValues={
                ':u': username,
                ':c': course_id
            }
        )
        print(response)
        if response['Count'] > 0:
            response = {
                'statusCode': 200,
                'headers': {
                'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'message': f'{username} is enrolled in course {course_id}.'})
            }
        else:
            response = {
                'statusCode': 404,
                'headers': {
                'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'message': f'{username} is not enrolled in course {course_id}.'})
            }
    else:
        response = {
            'statusCode': 405,
            'headers': {
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'message': 'Method not allowed'})
        }
    
    
    return response
