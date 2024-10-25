import React, { useState } from "react"
import {useLocation} from "react-router-dom"
import { useNavigate } from 'react-router-dom';
import '../stylesheets/viewOrder.css';
import '../stylesheets/footer.css';

const ViewOrder = () => {

    const location = useLocation()

    const navigate = useNavigate()

    const [order, setOrder] = useState(location.state?.order)

    const confirm_Order = () => {
        navigate('/viewConfirmation', {state: {order}})
    }

    const total_cost = () => {
        let total = 0;
        for(let i = 0; i < 5; i++){
            total += order.buyQuantity[i] * order.productPrices[i];
        }
        return Math.round(total * 100) / 100;
    }

    return(
        <div>
            <h1>View Order</h1>
            <h3>Items</h3>
            <div class="item-container">
                <div class="item">
                    <h2>Item 1</h2>
                    <p>{order?.buyQuantity[0]}</p>
                </div>

                <div class="item">
                    <h2>Item 2</h2>
                    <p>{order?.buyQuantity[1]}</p>
                </div>

                <div class="item">
                    <h2>Item 3</h2>
                    <p>{order?.buyQuantity[2]}</p>
                </div>

                <div class="item">
                    <h2>Item 4</h2>
                    <p>{order?.buyQuantity[3]}</p>
                </div>

                <div class="item">
                    <h2>Item 5</h2>
                    <p>{order?.buyQuantity[4]}</p>
                </div>
            </div>

            <div class="cost-container">
                <h2>Total Cost</h2>
                <p>{total_cost()}</p>
            </div>

            <h3>Card</h3>
            <div class="card-container">
                <h2>Card Number</h2>
                <p>{order?.credit_card_number}</p>

                <h2>Expiration Date</h2>
                <p>{order?.expir_date}</p>

                <h2>CVV</h2>
                <p>{order?.cvvCode}</p>

                <h2>Card Holder</h2>
                <p>{order?.card_holder_name}</p>
            </div>

            <h3>Address</h3>
            <div class="address-container">
                <h2>Address 1</h2>
                <p>{order?.address1}</p>

                <h2>Address 2</h2>
                <p>{order?.address2}</p>

                <h2>City</h2>
                <p>{order?.city}</p>

                <h2>State</h2>
                <p>{order?.state}</p>

                <h2>Zip Code</h2>
                <p>{order?.zip}</p>
            </div>
            <button onClick={confirm_Order}>Confirm</button>
        </div>
        
    )
}

export default ViewOrder