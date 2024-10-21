import React from 'react'
import './stylesheets/App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './stylesheets/index.css'
import { BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom"
import Apparel from "./components/apparel"
import PaymentEntry from './components/paymentEntry'
import ShippingEntry from "./components/shippingEntry"
import ViewOrder from "./components/viewOrder"
import ViewConfirmation from './components/viewConfirmation'
import Home from './components/home'
import Menu from './components/menu'
import ContactUs from './components/contactUs'
import AboutUs from './components/aboutUs'
import Men from './components/men'
import Women from './components/women'

function App() {
  return (
    <div className="App">
      <Router>
        <Menu />
        <div className="content">
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} /> 
            <Route path="/home" element={<Home />} />
            <Route path="/apparel" element={<Apparel />} />
            <Route path="/payment" element={<PaymentEntry />} />
            <Route path="/viewOrder" element={<ViewOrder />} />
            <Route path="/viewConfirmation" element={<ViewConfirmation />} />
            <Route path="/shipping" element={<ShippingEntry />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/aboutUs" element={<AboutUs />} />
            <Route path="/men" element={<Men />} />
            <Route path="/women" element={<Women />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;