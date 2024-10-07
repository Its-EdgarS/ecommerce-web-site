import React from 'react';

const ShoppingCart = ({cart, updateQuantity, removeItem}) => {
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
                        <button type='button' onClick={() => removeItem(index)}>Remove</button>
                    </div>
                ))
            )}
        </div>
    );
};

export default ShoppingCart;