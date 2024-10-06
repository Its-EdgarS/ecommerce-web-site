import React, { useState } from "react"
import {useLocation} from "react-router-dom"
import { useNavigate } from 'react-router-dom';

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
        </div>
    )
}

export default PaymentEntry