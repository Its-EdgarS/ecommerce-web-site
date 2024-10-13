import React from 'react';
import {useState} from 'react';
import {useLocation} from "react-router-dom"
import { useNavigate } from 'react-router-dom';
import '../stylesheets/footer.css';
import '../stylesheets/aboutUs.css';


const AboutUs = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [order, setOrder] = useState(location.state?.order);

    return (
        
        <div className='aboutUs-container'>
            <h1>About Our Company</h1>
            <div>
                <h2>Mission Statement</h2>
                <p>
                    Our mission is to bring the highest quality of Ohio State apparel to their fans. As Ohio state alumni outselves,
                    we know what it's like to be a fan or current student at Ohio State and want to show your pride. We want to provide
                    those looking to show Ohio State pride with the high qualtiy material they deserve so they can keep rocking the 
                    Scarlet and Gold. We live to make apparel and want to give our customer the highest quality of service.

                </p>
            </div>
            <div>
                <h2>Strategy</h2>
                <p>
                    Our strategy is simple, make the best apparel possible. We work with many indpendent retailors across the state of Ohio
                    to get well made poliester for our products. We are constantly innovating new designs to create cool and interesting apparel
                    not sold anywhere else. Our strategt is ti make awesome OSU branded clothing that is built to last years after you college
                    experience.
                </p>
            </div>
            <div>
                <h2>Executives</h2>
                <div>
                    <h3>Edgar Sanchez</h3>
                    <img src="../../Team_Photos/Edgar.JPG" alt="Edgar Snachez" width="100" />
                    <div>
                        <h4>Position:</h4>
                        <p>Senior Programmer</p>
                        <h4>Education:</h4>
                        <p>Ohio State University</p>
                        <h4>Experience:</h4>
                        <p>With previous work experience as a Technology Architecture Analyst at Accenture and a Software Development Engineer at Amazon, Edgar Sanchez is the right engineer to bring our mission to life. </p>
                    </div>
                </div>
                <div>
                    <h3>Abril Diaz</h3>
                    <img src="" alt="Abril Diaz" width="100" />
                    <div>
                        <h4>Position:</h4>
                        <p>Senior Programmer</p>
                        <h4>Education:</h4>
                        <p>Ohio State University</p>
                        <h4>Experience:</h4>
                        <p></p>
                    </div>
                </div>
                <div>
                    <h3>Kyle Duff</h3>
                    <img src="" alt="Kyle Duff" width="100" />
                    <div>
                        <h4>Position:</h4>
                        <p>Senior Programmer</p>
                        <h4>Education:</h4>
                        <p>Ohio State University</p>
                        <h4>Experience:</h4>
                        <p>
                            Worked as a programmer in two separate startups where he gained valuable skills and experience used within
                            our company.
                        </p>
                    </div>
                </div>
            </div>
            <footer>
                <div class="footer-container">
                    <div class="footer-column">
                        <h4>Purchase Products</h4>
                        <ul>
                            <li><a onClick={() => navigate('/purchase', { state: { order } })}>Purchase</a></li>
                        </ul>
                    </div>
                    <div class="footer-column">
                        <h4>About Us</h4>
                        <ul>
                            <li><a onClick={() => navigate('/aboutUs', { state: { order } })}>About</a></li>
                        </ul>
                    </div>
                    <div class="footer-column">
                        <h4>Contact Us</h4>
                        <ul>
                            <li><a onClick={() => navigate('/contact', { state: { order } })}>Contact</a></li>
                        </ul>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default AboutUs;