const mongoose=require('mongoose')
const validator=require('validator')
const bcrypt=require('bcryptjs')
const apierror = require("../utils/apierror");



const ticketSchema = new mongoose.Schema({
    paymentId:{
        type:String,
        default:"N/A"
    },
    qty: {
        type: Number,
        default: 1
    },
    expDate: {
        type: Date,
        required: true
    },
    price:{
        type:Number,
        required:true
    },

    
    payment:{
        type:Boolean,
        default:true
    }
});

// Middleware to set expDate to 3 days after creation
ticketSchema.pre('save', function (next) {
    if (!this.expDate) {
        const now = new Date();
        this.expDate = new Date(now.setDate(now.getDate() + 3));
    }

    if(!this.paymentId || this.paymentId==="N/A")
        this.payment=false
    next();
});


const sch=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'name is not entered']
    },
    email:{
        type:String,
        required:[true,'email not given...'],
        unique:true,
        lowercase:true,
        validate:{
            validator:validator.isEmail,
            message:"validation failed for email"
        }
    },
    password:{
        type:String,
        required:true,
        minlength:[8,"password length >=8"],
        select:false
    },
    checkpassword:{
        type:String,
        // required:true,
        // validate:{
        //     //only works for create and save
        //     validator:function(el){
        //         return el===this.password
        //     },
        //     message:"password not matched"
        // }
    },
    tickets:{
        type:[ticketSchema],
        default:null
    }
 
},{minimize:false})


sch.pre("save",async function(next){
    
    if(!this.isModified('password')) return next();

    this.password=await bcrypt.hash(this.password,12)
    this.checkpassword=undefined
    next()
                                                                 
})



sch.methods.passcheck=async function(p_input,p_actual)
{
  return await bcrypt.compare(p_input,p_actual)
}



const User=mongoose.model("User",sch)


module.exports=User