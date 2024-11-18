import React, { useState, useEffect } from 'react';
import {useLocation} from "react-router-dom"
import axios from 'axios'
import '../stylesheets/viewConfirmation.css'
import '../stylesheets/footer.css';


const ViewConfirmation = () => {


    const [data, setData] = useState(null); 
    const [apparel, setApparel] = useState([]);
    const [loading, setLoading] = useState(true); 


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

    return (
        <div className="view-confirmation">
            <div className="view-confirmation-container">
                <h3> 
                    Thank you for your purchase!
                </h3>
                <h4>
                    Confirmation Number: {data['order_id']}
                </h4>
                <h4>
                    Order Summary <br />
                </h4>
                <div className="order-summary">
                    {data.products.map((product, index) => (
                        <div key={index}  className="order-item">
                            <img src={apparel[String(index)]['image_url']} alt={`Product ${index + 1}`} width="100" className="product-image" />
                            <div className="order-item-details">
                                <div className="product-info">
                                    <p className="product-name">Product {index + 1}</p>
                                    <p className="product-quantity">Quantity: {product[3]}</p>
                                </div>
                                <p className="product-price">Price: ${product[3] * apparel[String(index)]['price']}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        
    )
}

export default ViewConfirmation