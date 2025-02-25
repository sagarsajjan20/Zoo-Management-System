const express=require('express')
const tickets=require('../Controllers/ticketController')
const auth=require('../Controllers/authcontroller')

const ticketRouter=express.Router()

ticketRouter.post('/add',auth.protect,tickets.addTicket)
ticketRouter.post('/remove',auth.protect,tickets.removeTicket)
ticketRouter.get('/get',auth.protect,tickets.getTicket)

module.exports=ticketRouter