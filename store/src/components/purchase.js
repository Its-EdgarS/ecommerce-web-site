import React from 'react';
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';

const Purchase = () => {
    // hard coded the order object
    const [order, setOrder] = useState({
        buyQuantity: [0, 0, 0, 0, 0], credit_card_number: '', expir_date: '', cvvCode: '',
        card_holder_name: '', address1: '', address2: '', city: '', state: '', zip: ''
    })
    const navigate = useNavigate()

    // runs when pay button is clicked
    // trasnfers the order object to the payment page
    const handleSubmit = (e) => {
        e.preventDefault()
        navigate('/payment', { state: { order } })
    }

    // runs when the user enters a quantity
    const handleInputChange = (index, value) => {
        const newBuyQuantity = {...order.buyQuantity} // get copy of the buyQuantity array
        newBuyQuantity[index] = value
        setOrder({...order, buyQuantity: newBuyQuantity}) // update the order
    }

    return (
        <div> 
            <h2>Enter the quantity of products you want to buy</h2>
            <form onSubmit={handleSubmit}>
                <label>Product 1</label>
                <input
                    type='number'
                    required
                    onChange={(e) => handleInputChange(0, e.target.value)}
                />
                <br/>
                <button className='btn'>Pay</button>
            </form>
        </div>
    
    )


}

export default Purchase;