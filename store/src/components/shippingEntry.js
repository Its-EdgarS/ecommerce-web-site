import React, { useState } from "react"
import {useLocation} from "react-router-dom"
import { useNavigate } from 'react-router-dom';
import '../stylesheets/footer.css';

const PaymentEntry = () => {

    const location = useLocation()

    const navigate = useNavigate()

    const [order, setOrder] = useState(location.state?.order)

    const handleSubmit = (e) => {
        e.preventDefault()
        navigate('/viewOrder', {state: {order}})
    }

    const handleInputChange = (e) => {
        const {name, value} = e.target
        setOrder({...order, [name]: value}) // update the order
    }

    return (
        <div>
            <div>
                <form onSubmit={handleSubmit}>
                    <label>Address 1</label>
                    <input 
                        type='text'
                        name='address1'
                        required
                        onChange={(e) => handleInputChange(e)}
                    /> 
                    <br/>
                    <label>Address 2</label>
                    <input 
                        type='text'
                        name='address2'
                        required
                        onChange={(e) => handleInputChange(e)}
                    />
                    <br/>
                    <label>City</label>
                    <input 
                        type='text'
                        name='city'
                        required
                        onChange={(e) => handleInputChange(e)}
                    />
                    <br/>
                    <label>State</label>
                    <input 
                        type='text'
                        name='state'
                        required
                        onChange={(e) => handleInputChange(e)}
                    />
                    <br/>
                    <label>Zip</label>
                    <input 
                        type='text'
                        name='zip'
                        required
                        onChange={(e) => handleInputChange(e)}
                    />
                <br/>
                <button className='btn'>View Order</button>
                </form>
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

export default PaymentEntry