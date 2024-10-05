import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom"
import Purchase from "./components/purchase"
import PaymentEntry from './components/paymentEntry'
import ShippingEntry from "./components/shippingEntry"
import ViewOrder from "./components/viewOrder"
import ViewConfirmation from './components/viewConfirmation'

function App() {
  return (
    <div className="App">
      <Router>
        <div className="content">
          <Routes>
            <Route path="/" element={<Navigate to="/purchase" />} /> 
            <Route path="/purchase" element={<Purchase />} />
            <Route path="/payment" element={<PaymentEntry />} />
            <Route path="/shipping" element={<ShippingEntry />} />
            <Route path="/vieworder" element={<ViewOrder />} />
            <Route path="/viewconfirmation" element={<ViewConfirmation />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
