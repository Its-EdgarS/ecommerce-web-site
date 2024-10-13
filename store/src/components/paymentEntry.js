import React, { useState } from "react"
import {useLocation} from "react-router-dom"
import { useNavigate } from 'react-router-dom';
import '../stylesheets/footer.css';
import '../stylesheets/payment.css';

const PaymentEntry = () => {

    const location = useLocation()

    const navigate = useNavigate()

    const [order, setOrder] = useState(location.state?.order)

    const handleSubmit = (e) => {
        e.preventDefault()
        navigate('/shipping', {state: {order}})
    }

    const handleInputChange = (e) => {
        const {name, value} = e.target
        setOrder({...order, [name]: value}) // update the order
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Credit Card Number</label>
                <input 
                    type='text'
                    name='credit_card_number'
                    required
                    onChange={(e) => handleInputChange(e)}
                /> 
                <br/>
                <label>Expiration Date</label>
                <input 
                    type='date'
                    name='expir_date'
                    required
                    onChange={(e) => handleInputChange(e)}
                />
                <br/>
                <label>CVV Code</label>
                <input 
                    type='number'
                    name='cvvCode'
                    required
                    onChange={(e) => handleInputChange(e)}
                />
                <br/>
                <label>Card Holder Name</label>
                <input 
                    type='text'
                    name='card_holder_name'
                    required
                    onChange={(e) => handleInputChange(e)}
                />
                <br/>
                <button className='btn'>Next</button>
            </form>
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

export default PaymentEntry