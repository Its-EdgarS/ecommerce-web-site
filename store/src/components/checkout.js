import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../stylesheets/checkout.css"; 

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [order, setOrder] = useState(location.state?.order);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/viewOrder", { state: { order } });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrder({ ...order, [name]: value });
  };

  return (
    <div className="checkout">
      <div className="checkout-container">
        <form onSubmit={handleSubmit}>
          <div className="checkout-section">
            <h2>Contact</h2>
            <label>Email</label>
            <input
              type="email"
              name="email"
              required
              onChange={(e) => handleInputChange(e)}
            />
          </div>

          <div className="checkout-section">
            <h2>Delivery</h2>
            <div className="half-width-container">
              <div className="half-width">
                <label>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  required
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
              <div className="half-width">
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  required
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
            </div>
            <label>Address</label>
            <input
              type="text"
              name="address1"
              required
              onChange={(e) => handleInputChange(e)}
            />
            <label>Apartment, Suite, etc.</label>
            <input
              type="text"
              name="address2"
              onChange={(e) => handleInputChange(e)}
            />
            <div className="half-width-container">
              <div className="half-width">
                <label>City</label>
                <input
                  type="text"
                  name="city"
                  required
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
              <div className="half-width">
                <label>State</label>
                <input
                  type="text"
                  name="state"
                  required
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
              <div className="half-width">
                <label>Zip Code</label>
                <input
                  type="text"
                  name="zip"
                  required
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
            </div>
            <label>Phone</label>
            <input
              type="text"
              name="phone"
              required
              onChange={(e) => handleInputChange(e)}
            />
          </div>

          <div className="checkout-section">
            <h2>Payment</h2>
            <label>Credit Card Number</label>
            <input
              type="text"
              name="credit_card_number"
              required
              onChange={(e) => handleInputChange(e)}
            />
            <div className="half-width-container">
              <div className="half-width">
                <label>Expiration Date</label>
                <input
                  type="date"
                  name="expir_date"
                  required
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
              <div className="half-width">
                <label>CVV Code</label>
                <input
                  type="number"
                  name="cvvCode"
                  required
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
            </div>
            <label>Card Holder Name</label>
            <input
              type="text"
              name="card_holder_name"
              required
              onChange={(e) => handleInputChange(e)}
            />
          </div>

          <button className="checkout-btn">Submit Order</button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;