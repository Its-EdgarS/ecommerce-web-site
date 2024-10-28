import React, { useState, useEffect } from 'react';
import {useLocation} from "react-router-dom"
import axios from 'axios'
import '../stylesheets/viewConfirmation.css'
import '../stylesheets/footer.css';


const ViewConfirmation = () => {

    const location = useLocation()


    const [order, setOrder] = useState(location.state?.order)

    const [conf_num, setConfNum] = useState('');

    useEffect(() => {
        // invoke URL
        const apiEndpoint = 'https://41e3xst1h2.execute-api.us-east-2.amazonaws.com/dev/order-processing/order' 
        // Using axios to fetch data
        axios.post(apiEndpoint) 
            .then(response => {
                const data = response.data
                setConfNum(data.body);
            })
            .catch(error => console.error('Error fetch data: ', error))
    }, []) //The empty dependency array [] ensures that the effect runs only once.

    return (
        <div className="view-confirmation">
            <div className="view-confirmation-container">
                <h3> 
                    Thank you for your purchase!
                </h3>
                <h4>
                    Confirmation Number: {conf_num}
                </h4>
                <h4>
                    Order Summary <br />
                </h4>
                <div className="order-summary">
                    {order.productImages.map((image, index) => (
                        <div key={index}  className="order-item">
                            <img src={image} alt={`Product ${index + 1}`} width="100" className="product-image" />
                            <div className="order-item-details">
                                <div className="product-info">
                                    <p className="product-name">Product {index + 1}</p>
                                    <p className="product-quantity">Quantity: {order.buyQuantity[index]}</p>
                                </div>
                                <p className="product-price">Price: ${order.buyQuantity[index] * order.productPrices[index]}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        
    )
}

export default ViewConfirmation