import React from 'react';
import './stylesheets/App.css';
import { BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom"
import Purchase from "./components/purchase"
import PaymentEntry from './components/paymentEntry'
import ShippingEntry from "./components/shippingEntry"
import ViewOrder from "./components/viewOrder"
import ViewConfirmation from './components/viewConfirmation'
import Home from './components/home'
import Menu from './components/menu'

function App() {
  return (
    <div className="App">
      <Router>
        <Menu />
        <div className="content">
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} /> 
            <Route path="/home" element={<Home />} />
            <Route path="/purchase" element={<Purchase />} />
            <Route path="/payment" element={<PaymentEntry />} />
            <Route path="/shipping" element={<ShippingEntry />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
            <Route path="/vieworder" element={<ViewOrder />} />
            <Route path="/viewconfirmation" element={<ViewConfirmation />} />
