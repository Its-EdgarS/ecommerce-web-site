import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import '../stylesheets/home.css'
import axios from 'axios'
import ShoppingCart from "./shoppingCart"

const Home = () => {
    const [featuredJerseys, setFeaturedJerseys] = useState([])

    const conf_num = useState()

    useEffect(() => {
        // invoke URL
        const apiEndpoint = 'https://f69ur8oz4a.execute-api.us-east-1.amazonaws.com/dev/inventory-management/inventory/items?featured=True' 
        // Using axios to fetch data
        axios.get(apiEndpoint) 
            .then(response => {
                const data = response.data
                setFeaturedJerseys(data) // Set the featured jerseys data
            })
            .catch(error => console.error('Error fetch data: ', error))
    }, []) //The empty dependency array [] ensures that the effect runs only once.



    return (
        <div className="home-wrapper">
            <div className="home-banner">
                <div className="overlay"></div>
                <h1 className="home-text">Shop Merch From The Best Damn Team In The Land</h1>
            </div>

            <div className="featured-jerseys-wrapper">

                <div className="featured-jerseys-desc">
                    <h3 className="featured-jerseys-title">Featured Jerseys</h3>
                    <p>Support your favorite student athletes by purchasing our exclusive featured jerseys. Show your team spirit and pride with high-quality merchandise that stands out!</p>
                    <Link to="/jerseys" className="btn btn-primary btn-lg f-j-btn" role="button" aria-pressed="true">Shop All Jerseys</Link>
                </div>

                <div className="featured-jerseys-products card-deck">
                    {featuredJerseys.map((jersey, index) => (
                        <div key={index} className="product-card card">
                            <img src={jersey.image} alt={jersey.name} />
                            <div className="featured-jerseys-product-desc">
                                <p>{jersey.description}</p>
                                <p className="text-muted">${jersey.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="shop-men-women-wrapper">
                <Link to="/men">
                    <img className="shop-men-women-promo" src="/home/shop_men_promo.png" alt="shop_men_promo" />
                </Link>
                <Link to="/women">
                    <img className="shop-men-women-promo" src="/home/shop_women_promo.png" alt="shop_women_promo" />
                </Link>
            </div>

        </div>
    )
}

export default Home