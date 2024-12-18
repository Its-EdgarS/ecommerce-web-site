import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import '../stylesheets/viewOrder.css';

const ViewOrder = () => {
    const navigate = useNavigate();
    const [data, setData] = useState(null); 
    const [apparel, setApparel] = useState([]);
    const [loading, setLoading] = useState(true);  
    
    
    useEffect(() => {
        // invoke URL
        const apiEndpoint = 'https://41e3xst1h2.execute-api.us-east-2.amazonaws.com/dev/order-processing/order';
        
        axios.get(apiEndpoint)
            .then(response => {
                console.log(response.data)
                setData(response.data); 
                setLoading(false); 
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
                setLoading(false); 
            });

        // invoke URL
        const apiEndpoint2 = 'https://f69ur8oz4a.execute-api.us-east-1.amazonaws.com/dev/inventory-management/inventory/items?category_id=2' 
        // Using axios to fetch data
        axios.get(apiEndpoint2) 
            .then(response => {
                const data = response.data
                console.log(data)
                setApparel(data) // Set the featured jerseys data
            })
            .catch(error => console.error('Error fetch data: ', error))
    }, []);  
    
    if (loading) {
        return <div>Loading...</div>;
    }

    const confirm_Order = () => {
        navigate('/viewConfirmation');
    };

    const total_cost = () => {
        let total = 0;
        for (let i = 0; i < data.products.length; i++) {
            total += data.products[i][3] * apparel[String(i)]['price'];
        }
        return Math.round(total * 100) / 100;
    };

    return (
        <div className="view-order">
            <div className="view-order-container">
                <h3>Review Your Order</h3>
                <h4>Order Summary</h4>
                <div className="order-summary">
                {data.products.map((product, index) => (
                    <div key={index} className="order-item">
                        <img src={apparel[String(index)]['image_url']} alt={`Product ${index + 1}`} width="100" />
                        <div className="order-item-details">
                        <p className="product-name">Product {index + 1}</p>
                        <p className="product-quantity">Quantity: {product[3]}</p>
                        <p className="product-price">Price: ${apparel[String(index)]['price']}</p>
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
                    <p>Expiration Date: {data['expir_date']}</p>
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
