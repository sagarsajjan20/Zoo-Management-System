const jwt=require('jsonwebtoken')
const User=require("../models/usermodel")
const apperror=require('../utils/apierror')
const catchErr = require("../utils/catchasync");


exports.allUsers=catchErr(async (req,res,next)=>{
  const users=await User.find()
  res.status(200).json({
    status:"success",
    users

  })
})

const filtring=(obj, ...feilds)=>{
  const newObj={}
  Object.keys(obj).forEach(el=>{
    if(feilds.includes(el))
      newObj[el]=obj[el]
  })
  return newObj
}

exports.updateMe=catchErr(async (req,res,next)=>{

  //error if user posts passwors feild
  if(req.body.password || req.body.checkpassword)
    return next(new apperror('Put a POST request to updatePassword route to change password',400))
  

  //updating user with filtring
  const obj=filtring(req.body,'name','email')
  const data=await User.findOneAndUpdate({_id:req.user._id},obj,{
    new:true,
    runValidators:true
  })

  res.status(200).json({
    status:"success",
    data
  })
})


exports.deleteMe=catchErr(async (req,res,next)=>{
  
  //seting active as false
  await User.findByIdAndUpdate(req.user._id,{active:false})

  //using uqery middleware to unselect it while quering
  

  res.status(204).json({
    status:"success",
    data:null
   
  })


})

