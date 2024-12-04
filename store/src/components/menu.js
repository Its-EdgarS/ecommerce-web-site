import React from "react"
import { Link } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';

function Menu() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
            <Link className="navbar-brand d-flex align-items-center p-2 " to="/home">
                <img src="/navbar_images/store_logo.png" alt="Logo" width="30" height="30" className="d-inline-block align-top mr-2" />
                Buckeye Central
            </Link>
            <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                <ul className="navbar-nav fs-4">
                    <li className="nav-item">
                        <Link className="nav-link" to="/apparel">Apparel</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/apparel/jerseys">Jerseys</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/apparel/men">Men</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/apparel/women">Women</Link>
                    </li>
                    {/* <li className="nav-item">
                        <Link className="nav-link" to="/accessories">Accessories</Link>
                    </li> */}
                </ul>
            </div>

            <div className="d-flex align-items-center">
                <Link to="/search" className="nav-link p-2">
                    <img src="/navbar_images/search_icon.png" alt="Search" width="24" height="24" />
                </Link>
                <Link to="/account" className="nav-link p-2">
                    <img src="/navbar_images/account_icon.png" alt="Account" width="24" height="24" />
                </Link>
                <Link to="/cart" className="nav-link p-2">
                    <img src="/navbar_images/shoppingcart_icon.png" alt="Cart" width="24" height="24" />
                </Link>
            </div>

        </nav>
    )
}

export default Menu