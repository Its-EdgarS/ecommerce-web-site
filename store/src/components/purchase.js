import React from 'react';
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';

const Purchase = () => {
    // hard coded the order object
    const [order, setOrder] = useState({
        buyQuantity: [0, 0, 0, 0, 0], credit_card_number: '', expir_date: '', cvvCode: '',
        card_holder_name: '', address1: '', address2: '', city: '', state: '', zip: '', productImages: ['/product1.avif', '/product2.webp', '/product3.webp', '/product4.jpeg', '/product5.webp'], productPrices: [10.99, 20.99, 30.99, 40.99, 50.99]
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
                {order.productImages.map((image, index) => (
                    <div key={index}>
                        <label>Product {index + 1} - ${order.productPrices[index]}</label>
                        <img src={image} alt={`Product ${index + 1}`} width="100" />
                        <input
                            type='number'
                            required
                            onChange={(e) => handleInputChange(index, e.target.value)}
                        />
                        <br />
                    </div>
                ))}
                <button className='btn'>Pay</button>
            </form>
        </div>
    
    )
}

export default Purchase;