import React from "react"
import { Link } from "react-router-dom"

function Menu() {
    return (
        <nav>
            <ul>
                <li><Link to="/home">Home</Link></li>
                <li><Link to="/purchase">Purchase</Link></li>
                <li><Link to="/payment">Payment</Link></li>
                <li><Link to="/shipping">Shipping</Link></li>
                <li><Link to="/vieworder">View Order</Link></li>
                <li><Link to="/viewconfirmation">View Confirmation</Link></li>
            </ul>
        </nav>
    )
}

export default Menu