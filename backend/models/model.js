const mongoose=require('mongoose')

const sch=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'tor must have name'],
        unique:true 
    },

    duration:{
        type:Number,
        required:[true,'duration is compulsoryy']
    },

     maxGroupSize:{
        type:Number,
        required:[true,'size is compulsoryy']
    },

    difficulty:{
        type:String,
        required:[true,'difficulty is compulsoryy']
    },
    ratingsAverage:{
        type:Number,
        default:4.5
    },

    ratingsQuantity:{
        type:Number
    },

    price:{
        type:Number,
        required:[true,'price is compulsoryy']
    },

    summary:String,

    description:String,

    imageCover:{
        type:String,
        required:[true,'imgcover is compulsoryy']
    },

    images:[String],
    startDates:[Date]

})

const mod=mongoose.model('nayas',sch)

module.exports=mod