
const UserModel=require('../models/usermodel')
const catchErr = require("../utils/catchasync");
const AppError = require("../utils/apierror");

const Stripe=require('stripe');
const User = require('../models/usermodel');

//placing user order

exports.usersOrder=catchErr(async (req,res,next)=>{
     
    
    const Ticket=req.user.tickets

    if(Ticket.length){
        res.status(200).json({
            status:"success",
            Ticket
        })
    }
    else{
        res.status(200).json({
            status:"failure",
            Ticket:[]
            
        })
    }
    

    
})

exports.allOrder=catchErr(async (req,res,next)=>{
     
    try{
        const orders = await UserModel.aggregate([
            { $match: { tickets: { $ne: [] } } }, // Match users with non-empty tickets array
            { $unwind: "$tickets" }, // Unwind the tickets array
            {
              $project: {
                name: 1,
                email: 1,
                tId: { $ifNull: ["$tickets.tId", "N/A"] },
                qty: "$tickets.qty",
                expDate: "$tickets.expDate"
              }
            }
          ]);
          
          
        res.status(200).json({
            status:"success",
            data:orders

        })
    }
    catch{
        res.status(200).json({
            status:"failure",
            data:[]


        })
    }
    

    
})