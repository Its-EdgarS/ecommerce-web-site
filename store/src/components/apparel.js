import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import ShoppingCart from './shoppingCart';
import '../stylesheets/apparel.css';

const Apparel = () => {
    // hard coded the order object
    const [order, setOrder] = useState({
        buyQuantity: [0, 0, 0, 0, 0], 
        credit_card_number: '', 
        expir_date: '', 
        cvvCode: '',
        card_holder_name: '', 
        address1: '', 
        address2: '', city: '', 
        state: '', 
        zip: '', 
        productImages: ['/product1.avif', '/product2.webp', '/product3.webp', '/product4.jpeg', '/product5.webp'], 
        productPrices: [10.99, 20.99, 30.99, 40.99, 50.99]
        // productImages: [], 
        // productPrices: [] 

    })
    const navigate = useNavigate()
    const [cart, setCart] = useState([]);

    useEffect(() => {
        console.log('useEffect hook is running');
        // invoke URL
        const apiEndpoint = 'https://f69ur8oz4a.execute-api.us-east-1.amazonaws.com/dev/inventory-management/inventory' 
        // Using axios to fetch data
        axios.get(apiEndpoint) 
            .then(response => {
                const data = response.data
                console.log(data)
                // setOrder(prevOrder => ({
                //     ...prevOrder,
                //     productImages: data.productImages,
                //     productPrices: data.productPrices
                // }));
            })
            .catch(error => console.error('Error fetch data: ', error))
    }, []) //The empty dependency array [] ensures that the effect runs only once.

    // runs when pay button is clicked
    // trasnfers the order object to the payment page
    const handleSubmit = (e) => {
        e.preventDefault()
        navigate('/checkout', { state: { order } })
    }

    // runs when the user enters a quantity
    const handleInputChange = (index, value) => {
        const newBuyQuantity = {...order.buyQuantity} // get copy of the buyQuantity array
        newBuyQuantity[index] = value
        setOrder({...order, buyQuantity: newBuyQuantity}) // update the order

        // Update the cart if the item is already in the cart
        const newCart = [...cart];
        const existingItemIndex = newCart.findIndex(item => item.index === index);
        if (existingItemIndex !== -1) {
            newCart[existingItemIndex].quantity = parseInt(value, 10);
            setCart(newCart);
        }
    }

    const addToCart = (index) => {
        const newCart = [...cart];
        const existingItemIndex = newCart.findIndex(item => item.index === index);
        if (existingItemIndex !== -1) {
            newCart[existingItemIndex].quantity += order.buyQuantity[index];
        } else {
            newCart.push({
                index,
                image: order.productImages[index],
                price: order.productPrices[index],
                quantity: order.buyQuantity[index]
            });
        }
        setCart(newCart);
    };

    const updateQuantity = (index, quantity) => {
        const newCart = [...cart];
        newCart[index].quantity = quantity;
        setCart(newCart);

        // Update the order buyQuantity
        const newBuyQuantity = {...order.buyQuantity};
        newBuyQuantity[cart[index].index] = quantity;
        setOrder({ ...order, buyQuantity: newBuyQuantity });
    };

    const removeItem = (index) => {
        const newCart = cart.filter((_, i) => i !== index);
        setCart(newCart);

        // Update the order buyQuantity
        const newBuyQuantity = {...order.buyQuantity};
        newBuyQuantity[cart[index].index] = 0; // reset the quantity to 0
        setOrder({ ...order, buyQuantity: newBuyQuantity });
    };

    return (
        
        <div> 
            <div className='apparel-banner'>
                <h2>All Apparel</h2>
                <p>Enter the quantity of products you want to buy</p>
            </div>
            <div className='apparel-container'>
                <form onSubmit={handleSubmit}>
                    <div className='product-grid'>
                        {order.productImages.map((image, index) => (
                            <div className='product-item' key={index}>
                                <label>Product {index + 1} - ${order.productPrices[index]}</label>
                                <img src={image} alt={`Product ${index + 1}`} width="100" />
                                <input
                                    type='number'
                                    onChange={(e) => handleInputChange(index, e.target.value)}
                                />
                                <button type="button" onClick={() => addToCart(index)}>Add to Cart</button>
                                <br />
                            </div>
                        ))}
                    </div>
                    <ShoppingCart cart={cart} updateQuantity={updateQuantity} removeItem={removeItem}/>
                    <button className='cart-btn'>Checkout</button>
                </form>
            </div>
        </div>
    
    )
}

export default Apparel;