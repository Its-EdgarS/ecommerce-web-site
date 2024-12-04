import React from 'react'
import './stylesheets/App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './stylesheets/index.css'
import { BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom"
import Apparel from "./components/apparel"
import ViewOrder from "./components/viewOrder"
import ViewConfirmation from './components/viewConfirmation'
import Home from './components/home'
import Menu from './components/menu'
import ContactUs from './components/contactUs'
import AboutUs from './components/aboutUs'
import Men from './components/men'
import Women from './components/women'
import Checkout from './components/checkout'
import Footer from './components/footer'
import ShoppingCart from './components/shoppingCart'

function App() {
  return (
    <div className="App">
      <Router>
        <Menu />
        <div className="content">
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} /> 
            <Route path="/home" element={<Home />} />
            <Route path="/apparel" element={<Apparel filter='category_id=2' />} />
            <Route path="/apparel/jerseys" element={<Apparel filter='category_id=1'/>} />
            <Route path="/viewOrder" element={<ViewOrder />} />
            <Route path="/viewConfirmation" element={<ViewConfirmation />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/aboutUs" element={<AboutUs />} />
            <Route path="/apparel/men" element={<Apparel filter='gender=Male' />} />
            <Route path="/apparel/women" element={<Apparel filter='gender=Female' />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/cart" element={<ShoppingCart />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;