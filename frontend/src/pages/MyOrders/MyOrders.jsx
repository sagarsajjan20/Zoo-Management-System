import React, { useContext, useEffect, useState } from "react";
import './MyOrders.css';
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const MyOrders = () => {
    const { url, token } = useContext(StoreContext);
    const [data, setData] = useState([]);

    const fetchOrders = async () => {
        const response = await axios.post(url + "/api/order/userorders", {}, {
            headers: { authorization: `Bearer ${token}` }
        });
        setData(response.data.Ticket);
        console.log(response.data);
    }

    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    }, [token]);

    return (
        <div className="my-orders">
            <h2>My Tickets</h2>
            <div className="tickets-container">
                {
                    data.length > 0 ? (
                        data.map((element, index) => (
                            <div className="ticket-card" key={index}>
                                <p><strong>ID:</strong> {element._id}</p>
                                <p><strong>Quantity:</strong> {element.qty}</p>
                                <p><strong>Payment:</strong> {"paid"}</p>
                                <p><strong>Transaction ID:</strong> {element.paymentId || "N/A"}</p>
                                <p><strong>Expiration Date:</strong> {new Date(element.expDate).toLocaleString()}</p>
                            </div>
                        ))
                    ) : (
                        <p>No tickets found.</p>
                    )
                }
            </div>
        </div>
    );
}

export default MyOrders;
