import json
import boto3

sts_client = boto3.client('sts')

def lambda_handler(event, context):
    
    sts_response = sts_client.assume_role(RoleArn='arn:aws:iam::897858504723:role/dynamodb-fullaccess',
                                          RoleSessionName='test',
                                          DurationSeconds=900)
    
    my_dynamodb_client = boto3.client('dynamodb', region_name='us-east-2', 
                                      aws_access_key_id=sts_response['Credentials']['AccessKeyId'],
                                      aws_secret_access_key=sts_response['Credentials']['SecretAccessKey'],
                                      aws_session_token=sts_response['Credentials']['SessionToken'])
    
    #response = my_dynamodb_client.list_tables()
    #return response['TableNames']
    
    response = my_dynamodb_client.scan(TableName='users')
    # return response['Items']
    # return response['Items']
    # return {'message' : 'e'}
    items = response['Items']
    
    return {
        'statusCode': 200,
        'body': json.dumps(items),
        #"headers": {
        #  "Content-Type": "application/json"
        #}
        'headers': {
           'Access-Control-Allow-Origin': '*'
        }
    }
    