import json
import boto3

dynamodb = boto3.resource('dynamodb')
client = boto3.client('dynamodb')
table = dynamodb.Table('CoursesTable')


# define the handler function that the Lambda service will use as an entry point
def lambda_handler(event, context):
# extract values from the event object we got from the Lambda service and store in a variable
    
    action = event['action']
    
    if action == 'SCAN':
        data = client.scan(
            TableName='CoursesTable'
        )
        # return a properly formatted JSON object
        return {
        'statusCode': 200,
        # 'body': json.dumps('You are taking ' + courseName)
        'body': json.dumps(data)
        }

    elif action == 'GET':
        response = table.get_item(
            Key={
                'courseID': event['courseID']
            }
        )
                        
        return {
            'statusCode': 200,
            'body': json.dumps(response)
        }
        
    elif action == 'POST':
        courseID = event['courseID']
        courseName = event['courseName']
        description = event['description']
        category = event['category']
        price = event['price']
        startDate = event['startDate']
        endDate = event['endDate']
        
        response = table.put_item(
            Item={
                'courseID': courseID,
                'courseName': courseName,
                'description': description,
                'category': category,
                'price': price,
                'startDate': startDate,
                'endDate': endDate
            }
        )
                        
        return {
            'statusCode': 200,
            'body': json.dumps('Successfully added a course!')
        }

    
    return {
        'statusCode': 200,
        'body': json.dumps('None')
        }
