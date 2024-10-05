import React, { useState } from "react"
import {useLocation} from "react-router-dom"
import { useNavigate } from 'react-router-dom';

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
        </div>
    )
}

export default PaymentEntry