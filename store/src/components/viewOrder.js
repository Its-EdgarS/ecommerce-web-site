import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import '../stylesheets/viewOrder.css';

const ViewOrder = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [order, setOrder] = useState(location.state?.order);
    

    const confirm_Order = () => {
        navigate('/viewConfirmation', { state: { order } });
    };

    const total_cost = () => {
        let total = 0;
        for (let i = 0; i < 5; i++) {
            total += order.buyQuantity[i] * order.productPrices[i];
        }
        return Math.round(total * 100) / 100;
    };

    return (
        <div className="view-order">
            <div className="view-order-container">
                <h3>Review Your Order</h3>
                <h4>Order Summary</h4>
                <div className="order-summary">
                    {order.productImages.map((image, index) => (
                        <div key={index} className="order-item">
                            <img src={image} alt={`Product ${index + 1}`} width="100" />
                            <div className="order-item-details">
                                <p className="product-name">Product {index + 1}</p>
                                <p className="product-quantity">Quantity: {order.buyQuantity[index]}</p>
                                <p className="product-price">Price: ${order.productPrices[index]}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="shipping-info">
                    <h3>Shipping Information</h3>
                    <p>Address 1: {order.address1}</p>
                    <p>Address 2: {order.address2}</p>
                    <p>City: {order.city}</p>
                    <p>State: {order.state}</p>
                    <p>ZIP: {order.zip}</p>
                </div>
                <div className="card-info">
                    <h3>Card Information</h3>
                    <p>Card Holder Name: {order.card_holder_name}</p>
                    <p>Card Number: **** **** **** {order.credit_card_number.slice(-4)}</p>
                    <p>Expiration Date: {order.expir_date}</p>
                </div>
                <div className="total-cost">
                    Total Cost: ${total_cost()}
                </div>
                <button className="confirm-button" onClick={confirm_Order}>Confirm Order</button>
            </div>
        </div>
    );
};

export default ViewOrder;