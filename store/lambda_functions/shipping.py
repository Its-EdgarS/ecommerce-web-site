import json
import pymysql
import uuid
from datetime import datetime

# Database connection details
endpoint = 'shipping.c3k8cog02noa.us-east-2.rds.amazonaws.com'
username = 'admin'
password = 'shippinginfo'
database_name = 'shipping'

def lambda_handler(event, context):
    http_method = event['httpMethod']
    resource = event['resource']
    
    if http_method == 'POST' and resource == "/shipping":
        return process_shipping(event)
    else:
        return {
            "statusCode": 405,
            'headers': {'Access-Control-Allow-Origin':'*', 'Access-Control-Allow-Headers': 'Content-Type'},
            "body": json.dumps("Method Not Allowed")
        }

def process_shipping(event):
    connection = None
    try:
        # Parse input data
        body = event['body']
        business_id = body.get('business_id')
        shipment_address = body.get('shipment_address')
        num_packets = body.get('num_packets')
        packet_weight = body.get('packet_weight')
        
        if not all([business_id, shipment_address, num_packets, packet_weight]):
            return {
                "statusCode": 400,
                'headers': {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type'},
                "body": json.dumps("Invalid input data")
            }
        
        # Generate a unique token for the shipment
        token = str(uuid.uuid4())
        
        # Connect to MySQL and insert data
        connection = pymysql.connect(host=endpoint, user=username, password=password, database=database_name)
        
        with connection.cursor() as cursor:
            query = """
            INSERT INTO SHIPPING_ORDER (business_id, shipment_address, num_packets, packet_weight, token)
            VALUES (%s, %s, %s, %s, %s)
            """
            cursor.execute(query, (business_id, shipment_address, num_packets, packet_weight, token))
            connection.commit()
        
        # Return success response with token
        return {
            "statusCode": 201,
            'headers': {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type'},
            "body": json.dumps({"message": "Shipping initiated", "token": token})
        }
    
    except Exception as e:
        return {
            "statusCode": 500,
            'headers': {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type'},
            "body": json.dumps(f"Error processing shipping: {str(e)}")
        }
    
    finally:
        if connection:
            connection.close()