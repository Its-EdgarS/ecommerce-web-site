import json
import mysql.connector

def lambda_handler(event, context):

    cnx = mysql.connector.connect(
        host='ordersdatabase.c78oykiiortb.us-east-2.rds.amazonaws.com',
        user='admin',
        password='kyle1234',
        database='order'
    )

    cursor = cnx.cursor()

    # Get order details
    query = "SELECT * FROM order.CUSTOMER_ORDER ORDER BY id DESC LIMIT 1;"
    cursor.execute(query)
    order = cursor.fetchall()[0]  # Get the most recent order


    # Get product line items associated with the order
    query = "SELECT * FROM order.CUSTOMER_ORDER_LINE_ITEM WHERE CUSTOMER_ORDER_ID_FK = %s;"
    cursor.execute(query, (order[0],))
    products = cursor.fetchall()[0]

    # Get payment information
    query = "SELECT * FROM order.PAYMENT_INFO WHERE id = %s;"
    cursor.execute(query, (order[3],))
    payment = cursor.fetchall()[0]

    # Get shipping information
    query = "SELECT * FROM order.SHIPPING_INFO WHERE id = %s;" 
    cursor.execute(query, (order[4],))
    shipping = cursor.fetchall()[0]

    # Close the database connection
    cursor.close()
    cnx.close()

    # Structure the response data
    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type'
        },
        'address1': shipping[1],
        'address2': shipping[2],
        'city': shipping[3],
        'state': shipping[4],
        'zip': shipping[5],
        'name': payment[1],
        'card_number': payment[2],
        'expir_date': payment[3],
        'cvv': payment[4],
        'products': products,
        'order_id': order[0]
        
    }

import json
import mysql.connector

def lambda_handler(event, context):
    data = event

    incremented_value = 0

    cnx = mysql.connector.connect(
        host='ordersdatabase.c78oykiiortb.us-east-2.rds.amazonaws.com',
        user='admin',
        password='kyle1234',
        database='order'
    )

    cursor = cnx.cursor()

    insert_query = f"INSERT INTO order.PAYMENT_INFO (NAME, CARD_NUMBER, EXPIRATION_DATE, CVV) VALUES (%s, %s, %s, %s)"
    insert_values = (data['order']['firstName'], data['order']['credit_card_number'], data['order']['expir_date'], data['order']['cvvCode'])
    cursor.execute(insert_query, insert_values)
    cnx.commit()
    payment_key = cursor.lastrowid

    insert_query = f"INSERT INTO order.SHIPPING_INFO (ADDRESS_1, ADDRESS_2, CITY, STATE, ZIP) VALUES (%s, %s, %s, %s, %s)"
    insert_values = (data['order']['address1'], data['order']['address2'], data['order']['city'], data['order']['state'], data['order']['zip'])
    cursor.execute(insert_query, insert_values)
    cnx.commit()
    shipping_key = cursor.lastrowid

    insert_query = f"INSERT INTO order.CUSTOMER_ORDER (CUSTOMER_NAME, CUSTOMER_EMAIL, SHIPPING_INFO_ID_FK, PAYMENT_INFO_ID_FK) VALUES (%s, %s, %s, %s)"
    insert_values = (data['order']['firstName'], data['order']['email'], shipping_key, payment_key)
    cursor.execute(insert_query, insert_values)
    cnx.commit()
    order_id = cursor.lastrowid

    
    for key, value in data['order']['buyQuantity'].items():
        
        if value != "0":
            insert_query = f"INSERT INTO order.CUSTOMER_ORDER_LINE_ITEM (ITEM_NAME, QUANTITY, PRICE, IMAGE, CUSTOMER_ORDER_ID_FK) VALUES (%s, %s, %s, %s, %s)"
            insert_values = (key, value, data['order']['productPrices'][int(key)], data['order']['productImages'][int(key)], order_id)
            cursor.execute(insert_query, insert_values)
    cnx.commit()


    cursor.close()
    cnx.close()

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin':'*', 'Access-Control-Allow-Headers': 'Content-Type'},
        'body': order_id
    }

