import React, { useState } from "react"
import {useLocation} from "react-router-dom"
import { useNavigate } from 'react-router-dom';

const ShoppingCart = ({cart, updateQuantity, removeItem}) => {
    const location = useLocation()

    return (
        <div>
            <h2>Shopping Cart</h2>
            {cart.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                cart.map((item, index) => (
                    <div key={index}>
                        <img src={item.image} alt={`Product ${index + 1}`} width="100" />
                        <p>{item.description} - ${item.price}</p>
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