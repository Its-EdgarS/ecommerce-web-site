import React, { useState, useEffect } from 'react';
import {useLocation} from "react-router-dom"
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const ShoppingCart = ({updateQuantity, removeItem}) => {
    const location = useLocation()
    const [cart, setCart] = useState([]);

    useEffect(() => {
        // invoke URL
        const apiEndpoint = 'https://41e3xst1h2.execute-api.us-east-2.amazonaws.com/dev/order-processing/order' 
        // Using axios to fetch data
        axios.get(apiEndpoint) 
            .then(response => {
                const data = JSON.parse(response.data.body);
                setCart(data);// Set the featured jerseys data
            })
            .catch(error => console.error('Error fetch data: ', error))
    }, []) //The empty dependency array [] ensures that the effect runs only once.

    return (
        <div>
            <h2>Shopping Cart</h2>
            {cart.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                cart.map((item, index) => (
                    <div key={index}>
                        <img src={item.image} alt={`Product ${index + 1}`} width="100" />
                        <p>Product {index + 1} - ${item.price}</p>
                        <input
                            type='number'
                            value={item.quantity}
                            onChange={(e) => updateQuantity(index, e.target.value)}
                        />
                        <button className='cart-btn' type='button' onClick={() => removeItem(index)}>Remove</button>
                    </div>
                ))
            )}
        </div>
    );
};

export default ShoppingCart;