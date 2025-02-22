import React, { useState, useEffect } from 'react';
import './Orders.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const Orders = ({ url }) => {
  const [tickets, setTickets] = useState([]);

  const fetchAllTickets = async () => {
    try {
      const response = await axios.post(`${url}/api/order/allorders`);
      if (response.data.status === "success") {
        setTickets(response.data.data);
      } else {
        toast.error("Failed to fetch orders.");
      }
    } catch (error) {
      toast.error("An error occurred while fetching orders.");
    }
  };

  useEffect(() => {
    fetchAllTickets();
  }, []);

  return (
    <div className="orders-content">
      <h2>Booked Tickets</h2>
      <div className="orders-container">
        {tickets.length > 0 ? (
          tickets.map((ticket, index) => (
            <div key={index} className="order-card">
              <p><strong>Name:</strong> {ticket.name}</p>
              <p><strong>Email:</strong> {ticket.email}</p>
              <p><strong>Transaction ID:</strong> {ticket.paymentId || "N/A"}</p>
              <p><strong>Quantity:</strong> {ticket.qty}</p>
              <p><strong>Expiration Date:</strong> {new Date(ticket.expDate).toLocaleString()}</p>
            </div>
          ))
        ) : (
          <p>No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default Orders;
