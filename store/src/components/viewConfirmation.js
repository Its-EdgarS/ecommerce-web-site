import React, { useState } from "react"
import {useLocation} from "react-router-dom"
import { useNavigate } from 'react-router-dom';
import '../stylesheets/viewConfirmation.css'
import '../stylesheets/footer.css';


const ViewConfirmation = () => {

    const location = useLocation()
    const navigate = useNavigate()


    const [order, setOrder] = useState(location.state?.order)

    return (
        <div className="view-confirmation-container">
            <h1> 
                Thank you for your purchase!
            </h1>
            <h2>
                Confirmation Number: 123456789
            </h2>
            <h3>
                Order Summary: <br />
            </h3>
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
            <footer>
                <div class="footer-container">
                    <div class="footer-column">
                        <h4>Purchase Products</h4>
                        <ul>
                            <li><a onClick={() => navigate('/purchase', { state: { order } })}>Purchase</a></li>
                        </ul>
                    </div>
                    <div class="footer-column">
                        <h4>About Us</h4>
                        <ul>
                            <li><a onClick={() => navigate('/aboutUs', { state: { order } })}>About</a></li>
                        </ul>
                    </div>
                    <div class="footer-column">
                        <h4>Contact Us</h4>
                        <ul>
                            <li><a onClick={() => navigate('/contactUs', { state: { order } })}>Contact</a></li>
                        </ul>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default ViewConfirmation