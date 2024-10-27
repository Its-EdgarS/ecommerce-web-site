import json

items = {
    "1": {
        "name": "Egbuka_Jersey_Scarlet",
        "category": "jersey",
        "stock": 20,
        "price": 145.00,
        "image": "https://beckeye-central-images.s3.us-east-1.amazonaws.com/Egbuka_Jersey_Scarlet.webp",
        "gender": "all",
        "description": "Ohio State Buckeyes Nike #1 Quinshon Judkins Student Athlete Gray Football Jersey",
        "featured": True
    },
    "2": {
        "name": "Judkins_Jersey_Gray",
        "category": "jersey",
        "stock": 50,
        "price": 145.00,
        "image": "https://beckeye-central-images.s3.us-east-1.amazonaws.com/Judkins_Jersey_Gray.webp",
        "gender": "all",
        "description": "Ohio State Buckeyes Nike #2 Emeka Egbuka Student Athlete Scarlet Football Jersey",
        "featured": True
    },
    "3": {
        "name": "Smith_Jersey_White",
        "category": "jersey",
        "stock": 100,
        "price": 145.00,
        "image": "https://beckeye-central-images.s3.us-east-1.amazonaws.com/Smith_Jersey_White.webp",
        "gender": "all",
        "description": "Ohio State Buckeyes Nike #4 Jeremiah Smith Student Athlete White Football Jersey",
        "featured": True
    },
    "4": {
        "name": "ohiostate_red_tshirt",
        "category": "apparel",
        "stock": 100,
        "price": 34.99,
        "image": "https://beckeye-central-images.s3.us-east-1.amazonaws.com/ohiostate_scarlet_tshirt.avif",
        "gender": "men",
        "description": "Ohio State Buckeyes Scarlet T-Shirt",
        "featured": False
    },
    "5": {
        "name": "ohiostate_black_football_tshirt",
        "category": "apparel",
        "stock": 80,
        "price": 34.99,
        "image": "https://beckeye-central-images.s3.us-east-1.amazonaws.com/ohiostate_black_football_tshirt.webp",
        "gender": "men",
        "description": "Ohio State Buckeyes Black Football T-Shirt",
        "featured": False
    },
    "6": {
        "name": "ohiostate_buckeyes_black_tshirt",
        "category": "apparel",
        "stock": 75,
        "price": 44.99,
        "image": "https://beckeye-central-images.s3.us-east-1.amazonaws.com/ohiostate_buckeyes_black_tshirt.jpeg",
        "gender": "men",
        "description": "Ohio State Buckeyes Black And Scarlet T-Shirt",
        "featured": False
    },
    "7": {
        "name": "ohiostate_buckeyes_university_scarlet_tshirt",
        "category": "apparel",
        "stock": 90,
        "price": 44.99,
        "image": "https://beckeye-central-images.s3.us-east-1.amazonaws.com/ohiostate_buckeyes_university_scarlet_tshirt.webp",
        "gender": "men",
        "description": "Ohio State Buckeyes University Scarlet T-Shirt",
        "featured": False
    },
    "8": {
        "name": "ohiostate_scarlet_basketball_tshirt",
        "category": "apparel",
        "stock": 85,
        "price": 34.99,
        "image": "https://beckeye-central-images.s3.us-east-1.amazonaws.com/ohiostate_scarlet_basketball_tshirt.webp",
        "gender": "men",
        "description": "Ohio State Buckeyes Scarlet Basketball T-Shirt",
        "featured": False
    }

}


def lambda_handler(event, context):
    http_method = event['httpMethod']
    resource = event['resource']
    query_params = event.get('queryStringParameters', {})
    path_parameters = event.get('pathParameters', {})

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
        item_id = path_parameters.get('id')
        if item_id in items:
            return get_item_by_id(item_id)
        else:
            return {
                "statusCode": 404,
                'headers': {'Access-Control-Allow-Origin':'*', 'Access-Control-Allow-Headers': 'Content-Type'},
                "body": json.dumps("Item Not Found")
            }
    else:
        return {
            "statusCode": 404,
            'headers': {'Access-Control-Allow-Origin':'*', 'Access-Control-Allow-Headers': 'Content-Type'},
            "body": json.dumps("Resource Not Found")
        }


def get_items():
    return {
        "statusCode": 200,
        'headers': {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type'},
        "body": json.dumps(list(items.values()))
    }


def get_items_by_filter(param, value):
    # Determine the data type of the `param` in the `items` dictionary
    example_value = next((item.get(param) for item in items.values() if item.get(param) is not None), None)
    
    # Convert the query parameter to match the type of the example value
    if isinstance(example_value, bool):
        value = value.lower() == "true"
    elif isinstance(example_value, int):
        value = int(value)
    elif isinstance(example_value, float):
        value = float(value)

    filtered_items = [
        item for item in items.values()
        if item.get(param) == value 
    ]
    return {
        "statusCode": 200,
        'headers': {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type'},
        "body": json.dumps(filtered_items)
    }


def get_item_by_id(item_id):
    return {
        "statusCode": 200,
        'headers': {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type'},
        "body": json.dumps(items[item_id])
    }