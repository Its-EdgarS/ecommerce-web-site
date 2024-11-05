import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import '../stylesheets/viewOrder.css';

const ViewOrder = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [order, setOrder] = useState(location.state?.order);
    const [data, setData] = useState(null);  // Set initial value to `null` to represent loading state
    const [loading, setLoading] = useState(true);  // Track loading state
    
    useEffect(() => {
        // invoke URL
        const apiEndpoint = 'https://41e3xst1h2.execute-api.us-east-2.amazonaws.com/dev/order-processing/order';
        
        axios.get(apiEndpoint)
            .then(response => {
                setData(response.data); 
                setLoading(false); 
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
                setLoading(false); 
            });
    }, []);  
    
    if (loading) {
        return <div>Loading...</div>;
    }

    const confirm_Order = () => {
        navigate('/viewConfirmation', { state: { order, id: data["order_id"] } });
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
                    <p>Address 1: {data['address1']}</p>
                    <p>Address 2: {data['address2']}</p>
                    <p>City: {data['city']}</p>
                    <p>State: {data['state']}</p>
                    <p>ZIP: {data['zip']}</p>
                </div>
                <div className="card-info">
                    <h3>Card Information</h3>
                    <p>Card Holder Name: {data['name']}</p>
                    <p>Card Number: **** **** **** {data['card_number'].slice(-4)}</p>
                    <p>Expiration Date: {data['expir']}</p>
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
