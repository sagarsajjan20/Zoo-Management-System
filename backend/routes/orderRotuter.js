const express=require('express')
const auth=require('../Controllers/authcontroller')
const orders=require('../Controllers/orderController')

const orderRouter=express.Router()

orderRouter.post("/userorders",auth.protect,orders.usersOrder)
orderRouter.post("/allorders",orders.allOrder)

module.exports=orderRouter