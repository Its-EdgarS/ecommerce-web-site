import React, { useState } from "react"
import {useLocation} from "react-router-dom"

const ViewConfirmation = () => {

    const location = useLocation()


    const [order, setOrder] = useState(location.state?.order)

    return (
        <div>
            <h1> 
                Thank you for your purchase!
            </h1>
            <h2>
                Confirmation Number: 123456789
            </h2>
            <h3>
                Order Summary: <br />
            </h3>
            <div>
                {order.productImages.map((image, index) => (
                    <div key={index}>
                        <img src={image} alt={`Product ${index + 1}`} width="100" />
                        <p>Product {index + 1}: {order.buyQuantity[index]}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ViewConfirmation