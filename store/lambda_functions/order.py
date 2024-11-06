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


    query = "SELECT * FROM order.CUSTOMER_ORDER ORDER BY id DESC LIMIT 1;"
    cursor.execute(query)
    order = cursor.fetchall()[0]
    print(order)



    query = "SELECT * FROM order.CUSTOMER_ORDER_LINE_ITEM WHERE CUSTOMER_ORDER_ID_FK = %s;"
    cursor.execute(query, (order[0],))
    products = cursor.fetchall()

    query = "SELECT * FROM order.PAYMENT_INFO WHERE id = %s;"
    cursor.execute(query, (order[4],))
    payment = cursor.fetchall()[0]

    query = "SELECT * FROM order.SHIPPING_INFO WHERE id = %s;" 
    cursor.execute(query, (order[3],))
    shipping = cursor.fetchall()[0]

    cursor.close()
    cnx.close()

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

    cnx = mysql.connector.connect(
        host='ordersdatabase.c78oykiiortb.us-east-2.rds.amazonaws.com',
        user='admin',
        password='kyle1234',
        database='order'
    )

    order_id = 0
    cursor = cnx.cursor()

    if data['context'] == 'checkout':
        select_query = """
            SELECT ID
            FROM order.CUSTOMER_ORDER
            ORDER BY ID DESC
            LIMIT 1
        """
        cursor.execute(select_query)
        order_id = cursor.fetchone()[0]

        insert_query = f"INSERT INTO order.PAYMENT_INFO (NAME, CARD_NUMBER, EXPIRATION_DATE, CVV) VALUES (%s, %s, %s, %s)"
        insert_values = (data['order']['firstName'], data['order']['credit_card_number'], data['order']['expir_date'], data['order']['cvvCode'])
        cursor.execute(insert_query, insert_values)
        cnx.commit()
        payment_key = cursor.lastrowid

        cursor.execute("SELECT * FROM order.PAYMENT_INFO WHERE ID = %s", (payment_key,))
        order_row = cursor.fetchone()
        print(order_row)


        insert_query = f"INSERT INTO order.SHIPPING_INFO (ADDRESS_1, ADDRESS_2, CITY, STATE, ZIP) VALUES (%s, %s, %s, %s, %s)"
        insert_values = (data['order']['address1'], data['order']['address2'], data['order']['city'], data['order']['state'], data['order']['zip'])
        cursor.execute(insert_query, insert_values)
        cnx.commit()
        shipping_key = cursor.lastrowid

        cursor.execute("SELECT * FROM order.SHIPPING_INFO WHERE ID = %s", (shipping_key,))
        order_row = cursor.fetchone()
        print(order_row)


        update_shipping_query = """
            UPDATE order.CUSTOMER_ORDER
            SET SHIPPING_INFO_ID_FK = %s
            WHERE ID = %s
        """
        cursor.execute(update_shipping_query, (shipping_key, order_id))
        cnx.commit()

        update_payment_query = """
            UPDATE order.CUSTOMER_ORDER
            SET PAYMENT_INFO_ID_FK = %s
            WHERE ID = %s
        """
        cursor.execute(update_payment_query, (payment_key, order_id))
        cnx.commit()

        update_payment_query = """
            UPDATE order.CUSTOMER_ORDER
            SET CUSTOMER_NAME = %s
            WHERE ID = %s
        """
        cursor.execute(update_payment_query, (data['order']['firstName'], order_id))
        cnx.commit()

        update_payment_query = """
            UPDATE order.CUSTOMER_ORDER
            SET CUSTOMER_EMAIL = %s
            WHERE ID = %s
        """
        cursor.execute(update_payment_query, (data['order']['email'], order_id))
        cnx.commit()

        cursor.execute("SELECT * FROM order.CUSTOMER_ORDER WHERE ID = %s", (order_id,))
        order_row = cursor.fetchone()
        print(order_row)


    elif data['context'] == "apparel":
        insert_query = f"INSERT INTO order.CUSTOMER_ORDER () VALUES ()"
        insert_values = ()
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
        'body': order_id,
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin':'*', 'Access-Control-Allow-Headers': 'Content-Type'},
    }
