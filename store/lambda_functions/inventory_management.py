from decimal import Decimal
import json
import pymysql
import datetime


endpoint = 'inventory-management.cpmqqgusk2j7.us-east-1.rds.amazonaws.com'
username = 'admin'
password = 'distentcomp'
database_name = 'inventory_management'

def lambda_handler(event, context):
    http_method = event['httpMethod']
    resource = event['resource']

    # Only handle GET methods
    if http_method != 'GET':
        return {
            "statusCode": 405,
            'headers': {'Access-Control-Allow-Origin':'*', 'Access-Control-Allow-Headers': 'Content-Type'},
            "body": json.dumps("Method Not Allowed")
        }
    
    if resource == "/inventory-management/inventory":
        return get_items()
    
    elif resource == "/inventory-management/inventory/items":
        # Extract the first query parameter
        query_params = event.get('queryStringParameters', {})
        first_param_key = next(iter(query_params), None)
        first_param_value = query_params.get(first_param_key) if first_param_key else None

        if first_param_key == None or first_param_value == None:
            return {
                "statusCode": 400,
                'headers': {'Access-Control-Allow-Origin':'*', 'Access-Control-Allow-Headers': 'Content-Type'},
                "body": json.dumps("error: No valid query parameter provided")
            }

        return get_items_by_filter(first_param_key, first_param_value)
    
    elif resource == "/inventory-management/inventory/items/{id}":
        item_id = event['pathParameters'].get('id')
        return get_item_by_id(item_id)

    else:
        return {
            "statusCode": 404,
            'headers': {'Access-Control-Allow-Origin':'*', 'Access-Control-Allow-Headers': 'Content-Type'},
            "body": json.dumps("Resource Not Found")
        }


def get_items():
    connection = pymysql.connect(host=endpoint, user=username, password=password, database=database_name)

    try:
        with connection.cursor(pymysql.cursors.DictCursor) as cursor:  # Use DictCursor
            query = 'SELECT * FROM products'
            cursor.execute(query)
            rows = cursor.fetchall()

        return {
            "statusCode": 200,
            'headers': {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type'},
            "body": json.dumps(rows, default=JSON_type_converter)
        }
    
    finally:
        connection.close()


def get_items_by_filter(param, value):
    connection = pymysql.connect(host=endpoint, user=username, password=password, database=database_name)

    try:
        with connection.cursor(pymysql.cursors.DictCursor) as cursor:  # Use DictCursor
            # Dynamic SQL query to filter items
            query = f'SELECT * from products WHERE {param} = %s'
            cursor.execute(query, (value,))
            rows = cursor.fetchall()

            return {
                "statusCode": 200,
                'headers': {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type'},
                "body": json.dumps(rows, default=JSON_type_converter)
            }

    finally:
        connection.close()


def get_item_by_id(item_id):
    connection = pymysql.connect(host=endpoint, user=username, password=password, database=database_name)

    try:
        with connection.cursor(pymysql.cursors.DictCursor) as cursor:  # Use DictCursor
            # Dynamic SQL query to filter items
            query = f'SELECT * from products WHERE product_id = %s'
            cursor.execute(query, (item_id,))
            row = cursor.fetchone() # Fetch one row

            if row is None:
                return {
                    "statusCode": 404,
                    'headers': {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type'},
                    "body": json.dumps("Item not found")
                }

            return {
                "statusCode": 200,
                'headers': {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type'},
                "body": json.dumps(row, default=JSON_type_converter)
            }

    finally:
        connection.close()

def JSON_type_converter(obj):
    """Helper function to convert non JSON serializable objects to JSON serializable objects for JSON.dumps()"""
    if isinstance(obj, Decimal):
        return float(obj)
    if isinstance(obj, (datetime.date, datetime.datetime)):
        return obj.isoformat()
    raise TypeError
