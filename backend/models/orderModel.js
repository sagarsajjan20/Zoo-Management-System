const mongoose =require('mongoose')

const orderSch=new mongoose.Schema({
    userId:{type:Number,required:true},
    items:{type:String,required:true},
    amount:{type:Number,required:true},
    date:{type:Date,default:Date.now()},
    payment:{type:Boolean,default:false}
})

const OrderModel=mongoose.model("order",orderSch)

module.exports=OrderModel