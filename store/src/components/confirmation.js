import React, { useState } from "react"
import {useLocation} from "react-router-dom"

const Confirmation = () => {

    const location = useLocation()


    const [order, setOrder] = useState(location.state?.order)

    return (
        <div>
            <h1> 
                address1: {order.address1} <br />
                address2: {order.address2}
            </h1>
        </div>
    )
}

export default Confirmation