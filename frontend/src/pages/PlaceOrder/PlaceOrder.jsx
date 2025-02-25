// import React, { useContext, useState } from 'react';
// import './PlaceOrder.css';
// import { StoreContext } from '../../context/StoreContext';
// import axios from "axios";
// import { useNavigate } from 'react-router-dom';

// const PlaceOrder = () => {
//   const { getTotalCartAmount, token, url } = useContext(StoreContext);
//   const [data, setData] = useState({
//     qty: "",
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: ""
//   });

//   const navigate = useNavigate(); // Correctly call useNavigate inside the component

//   const onchangeHandler = (event) => {
//     const name = event.target.name;
//     const value = event.target.value;
//     setData(data => ({ ...data, [name]: value }));
//   }

//   const placeOrder = async (event) => {
//     event.preventDefault();
//     try {
//       const response = await axios.post(url + "/api/ticket/add", { ticketData: { qty: data.qty } }, {
//         headers: { authorization: `Bearer ${token}` }
//       });
      
//       navigate('/myorders'); 
//     } catch {
//       alert("please login to buy Tickets!!");
//     }
//   }

//   return (
//     <form onSubmit={placeOrder} className='place-order'>
//       <div className="place-order-left">
//         <p className='title'>Ticket Information</p>
//         <div className="multi-fields">
//           <input required name='firstName' onChange={onchangeHandler} value={data.firstName} type="text" placeholder='First Name' />
//           <input required name='lastName' onChange={onchangeHandler} value={data.lastName} type="text" placeholder='Last Name' />
//         </div>
//         <input required name='email' onChange={onchangeHandler} value={data.email} type="email" placeholder='Email address' />
//         <input required name='qty' onChange={onchangeHandler} value={data.qty} type="number" placeholder='No of Tickets' />
//         <input required name='phone' onChange={onchangeHandler} value={data.phone} type="text" placeholder='phone' />
//       </div>
//       <div className="place-order-right">
//         <div className="cart-total">
//           <h2>BILL</h2>
//           <div>
//             <div className="cart-total-details">
//               <p>Cost Of One Ticket</p>
//               <p>$50</p>
//             </div>
//             <hr />
//             <div className="cart-total-details">
//               <p>Tax</p>
//               <p>10%</p>
//             </div>
//             <hr />
//             <div className="cart-total-details">
//               <b>Total</b>
//               <b>${50*data.qty+50*data.qty*0.1}</b>
//             </div>
//           </div>
//           <button type='submit'>PROCEED TO PAYMENT</button>
//         </div>
//       </div>
//     </form>
//   );
// }

// export default PlaceOrder;




import React, { useContext, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const { getTotalCartAmount, token, url } = useContext(StoreContext);
  const [data, setData] = useState({
    qty: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: ""
  });

  const navigate = useNavigate(); // Correctly call useNavigate inside the component

  const onchangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
  }

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  const displayRazorpay = async (orderData) => {
    const res = await loadRazorpayScript();
    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?');
      return;
    }

    const options = {
      key: 'rzp_test_qkeXPdFgurgaAQ',
      amount: orderData.amount,
      currency: orderData.currency,
      name: 'ZooWeb',
      description: 'Test Transaction',
      order_id: orderData.id,
      handler: async (response) => {
        try {
          await axios.post(url + "/api/ticket/add", { 
            ticketData: { qty: data.qty, paymentId: response.razorpay_payment_id } 
          }, {
            headers: { authorization: `Bearer ${token}` }
          });
          navigate('/myorders'); 
        } catch {
          alert("Please login to buy Tickets!!");
        }
      },
      prefill: {
        name: data.firstName + " " + data.lastName,
        email: data.email,
        contact: data.phone
      },
      theme: {
        color: '#3399cc'
      }
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  const placeOrder = async (event) => {
    event.preventDefault();

    try {
      const orderResponse = await axios.post(url + "/api/payment/orders", { 
        amount: 50 * data.qty + 50 * data.qty * 0.1 
      }, {
        headers: { authorization: `Bearer ${token}` }
      });

      displayRazorpay(orderResponse.data);
    } catch {
      alert("Please login to buy Tickets!!");
    }
  }

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className='title'>Ticket Information</p>
        <div className="multi-fields">
          <input required name='firstName' onChange={onchangeHandler} value={data.firstName} type="text" placeholder='First Name' />
          <input required name='lastName' onChange={onchangeHandler} value={data.lastName} type="text" placeholder='Last Name' />
        </div>
        <input required name='email' onChange={onchangeHandler} value={data.email} type="email" placeholder='Email address' />
        <input required name='qty' onChange={onchangeHandler} value={data.qty} type="number" placeholder='No of Tickets' />
        <input required name='phone' onChange={onchangeHandler} value={data.phone} type="text" placeholder='phone' />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>BILL</h2>
          <div>
            <div className="cart-total-details">
              <p>Cost Of One Ticket</p>
              <p>₹50</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Number Of Ticlets</p>
              <p>{data.qty || 0}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Tax</p>
              <p>10%</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b> ₹{50 * data.qty + 50 * data.qty * 0.1}</b>
            </div>
          </div>
          <button type='submit'>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
}

export default PlaceOrder;

