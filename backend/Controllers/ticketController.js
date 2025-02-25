const User=require("../models/usermodel")
const apperror=require('../utils/apierror')
const catchErr = require("../utils/catchasync");

exports.addTicket=catchErr( async(req,res,next)=>{
    // Find the user by ID  
    const user = await User.findById(req.user._id);
        
    if (!user) {
       
        return next(new apperror('user not found',404));
    }
    
    if (!user.tickets) {
        user.tickets = [];
    }
    // Add ticket to the tickets array
    user.tickets.push(req.body.ticketData);
  

    // Save the updated user
    await user.save({validateBeforeSave:false});

    res.status(200).json({
        status:"success",
        data:"ticket was added to user account"
    })
})

exports.removeTicket = catchErr(async (req, res, next) => {
    // Find the user by ID
    const user = await User.findById(req.user._id);

    if (!user) {
        return next(new apperror('User not found', 404));
    }

    if (!user.tickets || user.tickets.length === 0) {
        return next(new apperror('No tickets to remove', 404));
    }

    // Remove a particular ticket from the tickets array
    const ticketIdToRemove = req.body.ticketId; 

    user.tickets = user.tickets.filter(ticket => ticket._id.toString() !== ticketIdToRemove);

    await user.save({ validateBeforeSave: false });

    res.status(200).json({
        status: "success",
        data: "Ticket was deleted from user account"
    });
});

exports.getTicket=catchErr( async(req,res,next)=>{
    
    const user = await User.findById(req.user._id);

    if (!user) {
        return next(new apperror('User not found', 404));
    }

    if (!user.tickets || user.tickets.length === 0) {
        return next(new apperror('No tickets to remove', 404));
    }
    res.status(200).json({
        status:"success",
        data:user.tickets
    })
})