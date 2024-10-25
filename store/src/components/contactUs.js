import React, { useState } from "react"
import {useLocation} from "react-router-dom"
import { useNavigate } from 'react-router-dom';
import '../stylesheets/contactUs.css';
import '../stylesheets/footer.css';

const ContactUs = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [order, setOrder] = useState(location.state?.order)

    return (
        <div className="contact-us-container">
            <h1>Contact Us</h1>
            <p>If you have any questions, issues, or need help with your purchase, please feel free to contact us. Our support team is here to assist you.</p>
            
            <h2>Contact Information</h2>
            <p>Email: support@example.com</p>
            <p>Phone: +1 (800) 123-4567</p>
            <p>Address: 1234 Example St, City, State, ZIP</p>
            
            <h2>Support and Return Policies</h2>
            <p>We offer a 30-day return policy for all our products. If you are not satisfied with your purchase, you can return it within 30 days of receipt for a full refund. Please ensure that the product is in its original condition and packaging.</p>
            <p>For any issues with your order, please contact our support team at the email or phone number provided above. We will do our best to resolve your issue as quickly as possible.</p>
            
            <h2>Frequently Asked Questions (FAQ)</h2>
            <h3>1. How do I return a product?</h3>
            <p>To return a product, please contact our support team with your order number and reason for return. We will provide you with a return authorization and instructions on how to send the product back to us.</p>
            
            <h3>2. How long does it take to process a return?</h3>
            <p>Once we receive your returned product, we will process the return within 5-7 business days. You will receive a confirmation email once the return has been processed and the refund has been issued.</p>
            
            <h3>3. What should I do if I receive a damaged or defective product?</h3>
            <p>If you receive a damaged or defective product, please contact our support team immediately with your order number and a description of the issue. We will arrange for a replacement or refund as soon as possible.</p>
            
            <h3>4. Can I exchange a product?</h3>
            <p>Yes, you can exchange a product within 30 days of receipt. Please contact our support team with your order number and details of the product you would like to exchange. We will provide you with instructions on how to proceed with the exchange.</p>
            
            <h2>Contact Form</h2>
            <form>
                <label>
                    Name:
                    <input type="text" name="name" required />
                </label>
                <label>
                    Email:
                    <input type="email" name="email" required />
                </label>
                <label>
                    Message:
                    <textarea name="message" required></textarea>
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default ContactUs;