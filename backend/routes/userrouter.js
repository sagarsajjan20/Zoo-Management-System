const express=require('express')
const {allUsers,updateMe,deleteMe}=require('../Controllers/usercontroller')
const {sinup,login,protect,forgotPassword,resetPassword,updatePassword}=require('../Controllers/authcontroller')

const urouter=express.Router()

urouter.route('/').get(allUsers)
urouter.route('/').patch(protect,updateMe)
urouter.route('/').delete(protect,deleteMe)
urouter.route('/sinup').post(sinup)
urouter.route('/login').post(login)
urouter.route('/forgotPassword').post(forgotPassword)
urouter.route('/resetPassword/:x').post(resetPassword)
urouter.route('/updatePassword').patch(protect,updatePassword)



module.exports=urouter