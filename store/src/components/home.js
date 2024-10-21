import React from "react"
import { Link } from "react-router-dom"
import '../stylesheets/home.css'

const Home = () => {
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
                    <div className="product-card card">
                        <img src="/product_images/Judkins_Jersey_Gray.webp" alt="Quinshon Judkins Jersey"></img>
                        <div className="featured-jerseys-product-desc">
                            <p className="">Ohio State Buckeyes Nike #1 Quinshon Judkins Student Athlete Gray Football Jersey</p>
                            <p className="text-muted">$145.00</p>
                        </div>
                    </div>
                    <div className="product-card card">
                        <img src="/product_images/Egbuka_Jersey_Scarlet.webp" alt="Quinshon Judkins Jersey"></img>
                        <div className="featured-jerseys-product-desc">
                            <p className="">Ohio State Buckeyes Nike #2 Emeka Egbuka Student Athlete Scarlet Football Jersey
                            </p>
                            <p className="text-muted">$145.00</p>
                        </div>
                    </div>
                    <div className="product-card card">
                        <img src="/product_images/Smith_Jersey_White.webp" alt="Quinshon Judkins Jersey"></img>
                        <div className="featured-jerseys-product-desc">
                            <p className="">Ohio State Buckeyes Nike #4 Jeremiah Smith Student Athlete White Football Jersey
                            </p>
                            <p className="text-muted">$145.00</p>
                        </div>
                    </div>
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