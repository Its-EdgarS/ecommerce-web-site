import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ShoppingCart from "./shoppingCart";
import "../stylesheets/apparel.css";

const Apparel = () => {
    // hard coded the order object
    const [order, setOrder] = useState({
        buyQuantity: [0, 0, 0, 0, 0],
        items: [],
    });
    const [id, setId] = useState();
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);

    const [allApparel, setApparel] = useState([]);
    useEffect(() => {
        // invoke URL
        const apiEndpoint =
            "https://f69ur8oz4a.execute-api.us-east-1.amazonaws.com/dev/inventory-management/inventory/items?category_id=2";
        // Using axios to fetch data
        axios
            .get(apiEndpoint)
            .then((response) => {
                const data = response.data;
                console.log(data);
                setApparel(data); // Set the featured jerseys data
            })
            .catch((error) => console.error("Error fetch data: ", error));
    }, []); //The empty dependency array [] ensures that the effect runs only once.

    // runs when pay button is clicked
    // trasnfers the order object to the payment page
    const handleSubmit = (e) => {
        e.preventDefault();
        // invoke URL
        const apiEndpoint =
            "https://41e3xst1h2.execute-api.us-east-2.amazonaws.com/dev/order-processing/order";
        // Using axios to fetch data
        const payload = {
            context: "apparel",
            order: order,
        };
        axios
            .post(apiEndpoint, payload)
            .then((response) => {
                const data = response.data;
                navigate("/checkout");
            })
            .catch((error) => console.error("Error fetch data: ", error));
    };

    // runs when the user enters a quantity
    const handleInputChange = (index, value) => {
        const sanitizedValue = Math.max(0, parseInt(value, 10) || 0);
        const newBuyQuantity = { ...order.buyQuantity }; 
        newBuyQuantity[index] = sanitizedValue;
        setOrder({ ...order, buyQuantity: newBuyQuantity });
    };

    const addToCart = (index) => {
        if (order.buyQuantity[index] > 0) {
            const newCart = [...cart];
            const existingItemIndex = newCart.findIndex(
                (item) => item.index === index
            );
            if (existingItemIndex !== -1) {
                newCart[existingItemIndex].quantity += order.buyQuantity[index];
            } else {
                newCart.push({
                    index,
                    image: allApparel[String(index)]["image_url"],
                    price: allApparel[String(index)]["price"],
                    quantity: order.buyQuantity[index],
                });
            }
            setCart(newCart);
        }
    };

    const updateQuantity = (index, quantity) => {
        const newCart = [...cart];
        newCart[index].quantity = quantity;
        setCart(newCart);

        // Update the order buyQuantity
        const newBuyQuantity = { ...order.buyQuantity };
        newBuyQuantity[cart[index].index] = quantity;
        setOrder({ ...order, buyQuantity: newBuyQuantity });
    };

    const removeItem = (index) => {
        const newCart = cart.filter((_, i) => i !== index);
        setCart(newCart);

        // Update the order buyQuantity
        const newBuyQuantity = { ...order.buyQuantity };
        newBuyQuantity[cart[index].index] = 0; // reset the quantity to 0
        setOrder({ ...order, buyQuantity: newBuyQuantity });
    };

    return (
        <div>
            <div className="apparel-banner">
                <h2>All Apparel</h2>
                <p>Enter the quantity of products you want to buy</p>
            </div>
            <div className="apparel-container">
                <form onSubmit={handleSubmit}>
                    <div className="product-grid">
                        {allApparel.map((item, index) => (
                            <div className="product-item" key={index}>
                                <img
                                    src={item.image_url}
                                    alt={item.name}
                                    width="100"
                                />
                                <label>
                                    {item.description} - ${item.price}
                                </label>
                                <input
                                    type="number"
                                    value={order.buyQuantity[index]}
                                    min="0"
                                    onChange={(e) =>
                                        handleInputChange(index, e.target.value)
                                    }
                                />
                                <button
                                    type="button"
                                    onClick={() => addToCart(index)}
                                >
                                    Add to Cart
                                </button>
                                <br />
                            </div>
                        ))}
                    </div>
                    <ShoppingCart
                        cart={cart}
                        updateQuantity={updateQuantity}
                        removeItem={removeItem}
                    />
                    <button className="cart-btn">Checkout</button>
                </form>
            </div>
        </div>
    );
};

export default Apparel;
