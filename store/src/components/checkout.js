import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../stylesheets/checkout.css";

const CheckoutPage = () => {
    const [order, setOrder] = useState({});
    const [errors, setErrors] = useState({}); // Validation error state
    const location = useLocation();
    const navigate = useNavigate();
    const [id, setId] = useState();

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // Update the order state
        setOrder({ ...order, [name]: value });

        // Validate the input field
        validateInput(name, value);
    };

    const validateInput = (name, value) => {
        let error = "";

        switch (name) {
            case "email":
                error = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
                    ? ""
                    : "Please enter a valid email address.";
                break;
            case "phone":
                error = /^\d{10}$/.test(value)
                    ? ""
                    : "Phone number must be 10 digits.";
                break;
            case "credit_card_number":
                error = /^\d{16}$/.test(value)
                    ? ""
                    : "Credit card number must be 16 digits.";
                break;
            case "expir_date":
                const today = new Date();
                const selectedDate = new Date(value);
                error =
                    selectedDate > today
                        ? ""
                        : "Expiration date must be in the future.";
                break;
            case "cvvCode":
                error = /^\d{3,4}$/.test(value)
                    ? ""
                    : "CVV code must be 3 or 4 digits.";
                break;
            case "zip":
                error = /^\d{5}$/.test(value)
                    ? ""
                    : "Zip code must be 5 digits.";
                break;
            case "firstName":
            case "lastName":
            case "city":
            case "state":
            case "address1":
            case "card_holder_name":
                error = value.trim() === "" ? "This field is required." : "";
                break;
            default:
                break;
        }

        // Update the errors state
        setErrors({ ...errors, [name]: error });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate all fields on form submission
        const newErrors = {};
        Object.keys(order).forEach((key) => {
            const value = order[key];
            newErrors[key] = validateInput(key, value); // Set validation result for each field
        });

        // Set validation errors to state
        setErrors(newErrors);

        // Check for existing errors
        if (Object.values(newErrors).some((error) => error)) {
            console.log("Fix validation errors first.", newErrors);
            return;
        }

        // If no errors, proceed with form submission
        const apiEndpoint =
            "https://41e3xst1h2.execute-api.us-east-2.amazonaws.com/dev/order-processing/order";
        const payload = {
            context: "checkout",
            order: order,
        };

        axios
            .post(apiEndpoint, payload)
            .then((response) => {
                console.log("Order submitted successfully:", response.data);
                navigate("/viewOrder");
            })
            .catch((error) => console.error("Error fetching data:", error));
    };

    return (
        <div className="checkout">
            <div className="checkout-container">
                <form onSubmit={handleSubmit}>
                    {/* Contact Section */}
                    <div className="checkout-section">
                        <h2>Contact</h2>
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            required
                            onChange={handleInputChange}
                        />
                        {errors.email && (
                            <span className="error">{errors.email}</span>
                        )}
                    </div>

                    {/* Delivery Section */}
                    <div className="checkout-section">
                        <h2>Delivery</h2>
                        <div className="half-width-container">
                            <div className="half-width">
                                <label>First Name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    required
                                    onChange={handleInputChange}
                                />
                                {errors.firstName && (
                                    <span className="error">
                                        {errors.firstName}
                                    </span>
                                )}
                            </div>
                            <div className="half-width">
                                <label>Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    required
                                    onChange={handleInputChange}
                                />
                                {errors.lastName && (
                                    <span className="error">
                                        {errors.lastName}
                                    </span>
                                )}
                            </div>
                        </div>
                        <label>Address</label>
                        <input
                            type="text"
                            name="address1"
                            required
                            onChange={handleInputChange}
                        />
                        {errors.address1 && (
                            <span className="error">{errors.address1}</span>
                        )}
                        <label>Apartment, Suite, etc.</label>
                        <input
                            type="text"
                            name="address2"
                            onChange={handleInputChange}
                        />
                        <div className="half-width-container">
                            <div className="half-width">
                                <label>City</label>
                                <input
                                    type="text"
                                    name="city"
                                    required
                                    onChange={handleInputChange}
                                />
                                {errors.city && (
                                    <span className="error">{errors.city}</span>
                                )}
                            </div>
                            <div className="half-width">
                                <label>State</label>
                                <input
                                    type="text"
                                    name="state"
                                    required
                                    onChange={handleInputChange}
                                />
                                {errors.state && (
                                    <span className="error">
                                        {errors.state}
                                    </span>
                                )}
                            </div>
                            <div className="half-width">
                                <label>Zip Code</label>
                                <input
                                    type="text"
                                    name="zip"
                                    required
                                    onChange={handleInputChange}
                                />
                                {errors.zip && (
                                    <span className="error">{errors.zip}</span>
                                )}
                            </div>
                        </div>
                        <label>Phone</label>
                        <input
                            type="text"
                            name="phone"
                            required
                            onChange={handleInputChange}
                        />
                        {errors.phone && (
                            <span className="error">{errors.phone}</span>
                        )}
                    </div>

                    {/* Payment Section */}
                    <div className="checkout-section">
                        <h2>Payment</h2>
                        <label>Credit Card Number</label>
                        <input
                            type="text"
                            name="credit_card_number"
                            required
                            onChange={handleInputChange}
                        />
                        {errors.credit_card_number && (
                            <span className="error">
                                {errors.credit_card_number}
                            </span>
                        )}
                        <div className="half-width-container">
                            <div className="half-width">
                                <label>Expiration Date</label>
                                <input
                                    type="date"
                                    name="expir_date"
                                    required
                                    min={new Date().toISOString().split("T")[0]}
                                    onChange={handleInputChange}
                                />
                                {errors.expir_date && (
                                    <span className="error">
                                        {errors.expir_date}
                                    </span>
                                )}
                            </div>
                            <div className="half-width">
                                <label>CVV Code</label>
                                <input
                                    type="text"
                                    name="cvvCode"
                                    required
                                    onChange={handleInputChange}
                                />
                                {errors.cvvCode && (
                                    <span className="error">
                                        {errors.cvvCode}
                                    </span>
                                )}
                            </div>
                        </div>
                        <label>Card Holder Name</label>
                        <input
                            type="text"
                            name="card_holder_name"
                            required
                            onChange={handleInputChange}
                        />
                        {errors.card_holder_name && (
                            <span className="error">
                                {errors.card_holder_name}
                            </span>
                        )}
                    </div>

                    <button type="submit" className="checkout-btn">
                        Submit Order
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CheckoutPage;
