import React from "react"
import { Link } from "react-router-dom"

function Footer() {
    return (
        <footer>
            <div className="footer-container">
                <div className="footer-column">
                    <Link to="/aboutUs">
                        <div className="footer-text">About Us</div>
                    </Link>
                </div>
                <div className="footer-column">
                    <Link to="/contact">
                        <div className="footer-text">Contact Us</div>
                    </Link>
                </div>
            </div>
        </footer>
    )
}

export default Footer