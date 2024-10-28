import json

orders = []

def get_order(event, context):
    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin':'*', 'Access-Control-Allow-Headers': 'Content-Type'},
        'body': json.dumps(orders)
    }


def confirm_order(event, context):
    orders.append(event)

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin':'*', 'Access-Control-Allow-Headers': 'Content-Type'},
        'body': json.dumps("123456789")
    }
