# import the json utility package since we will be working with a JSON object
import json
# import the AWS SDK (for Python the package name is boto3)
import boto3
# import two packages to help us with dates and date formatting
from time import gmtime, strftime

# create a DynamoDB object using the AWS SDK
dynamodb = boto3.resource('dynamodb')
client = boto3.client('dynamodb')
# use the DynamoDB object to select our table
table = dynamodb.Table('Courses')
# store the current time in a human readable format in a variable
now = strftime("%a, %d %b %Y %H:%M:%S +0000", gmtime())

# define the handler function that the Lambda service will use as an entry point
def lambda_handler(event, context):
# extract values from the event object we got from the Lambda service and store in a variable
    
    action = event.get('action')
    
    if action == 'SCAN':
        data = client.scan(
            TableName='Courses'
        )
        # return a properly formatted JSON object
        return {
        'statusCode': 200,
        # 'body': json.dumps('You are taking ' + courseName)
        'body': json.dumps(data)
        }

    if action == 'GET':
        response = table.get_item(
            Key={
                'id': event['id']
            }
        )
                        
        return {
            'statusCode': 200,
            'body': json.dumps(response)
        }

    
    return {
        'statusCode': 200,
        'body': json.dumps('None')
        }
