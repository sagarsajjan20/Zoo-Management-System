const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const router = require("./routes/router");
const urouter = require("./routes/userrouter");
const apierror = require("./utils/apierror");
const { errcall } = require("./Controllers/errcontroller");


const cors=require('cors')
const animalRouter=require('./routes/animalRoute')
const ticketRouter=require('./routes/ticketRouter')
const orderRouter=require('./routes/orderRotuter')


dotenv.config({ path: "conf.env" });

const app = express();
app.use(express.json());
app.use(cors())
app.use("/api/user",urouter)
app.use("/api/tour", router);
app.use("/api/animal",animalRouter)
app.use("/images",express.static('uploads'))
app.use('/api/ticket',ticketRouter)
app.use('/api/order',orderRouter)




///////

const Razorpay = require('razorpay');

const instance = new Razorpay({
  key_id: 'rzp_test_qkeXPdFgurgaAQ',
  key_secret: '0npVdpTGty5QNbpsXomb4vjM'
});

app.post('/api/payment/orders', async (req, res) => {
  const { amount } = req.body;
  const options = {
    amount: amount * 100, // amount in smallest currency unit
    currency: 'INR'
  };
  try {
    const order = await instance.orders.create(options);
    res.json(order);
  } catch (error) {
    res.status(500).send('Something went wrong');
  }
});












//////




app.all("*", errcall);

///////////////////////////////////////////////////////////// error handling

const dev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stackTrace: err.stack,
  });
};
const pro = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: "ERROR",
      message: "something eally went wrong...",
    });
    console.error(err);
  }
};

const handelCastError = (error) => {
  let message = `invalid ${error.path} : ${error.value}`;
  error = new apierror(message, 400);
  return error;
};

const handelDuplicateFields = (msg) => {
  let temp = msg.match(/\{([^}]+)\}/);
  let message = `Duplicate value entered ${temp[0]}`;
  error = new apierror(message, 400);
  return error;
};

const handelValidationError = (error) => {
  const errors = Object.values(error.errors).map((val) => val.message);

  const message = `Invalid input data. ${errors.join(". ")}`;
  return new apierror(message, 400);
};

const handelJwtError=()=>{
  return new apierror('Invalid token',401)
}
const handelTokenExpiredError=()=>{
  return new apierror('Token expired',401)
}

app.use((err, req, res, next) => {
  //error handling middleware
  err.status = err.status || "error";
  err.statusCode = err.statusCode || 500;

  if (process.env.NODE_ENV == "development") dev(err, res);
  else if (process.env.NODE_ENV == "production") {
    let error = { ...err };

    if (err.name == "CastError") {
      console.log(err);
      error = handelCastError(error);
      pro(error, res);
    } else if (err.code == 11000) {
      error = handelDuplicateFields(err.errmsg);
      pro(error, res);
    } else if (err.name == "ValidationError") {
      error = handelValidationError(error);
      pro(error, res);
    } else if (err.name == "JsonWebTokenError") {
      error = handelJwtError();
      pro(error, res);
    } else if (err.name == "TokenExpiredError") {
      error = handelTokenExpiredError();
      pro(error, res);
    }
    
    else pro(err, res);
  }
});

module.exports = app;
