const mongoose=require('mongoose')

const sch= new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Animal must have a name']
    },

    info: {
        type: String,
        required: [true, 'Animal details (info) must be entered']
    },
    
    type: {
        type: String,
        enum: {
            values: ['Birds','Reptiles','Mammals','Amphibians','Big Cats', 'Primates'],
            message: "Type should be 'Herbivores', 'Carnivores', or 'Omnivores'"
        },
        required: [true, 'Animal must have a type']   
    },
    img:{
        type:String
        // required:[true,"animal photo is compulsory"]
    },
    cageNo: {
        type: Number,
        required: [true, 'Animal must have a Cage-Number'],
        unique: true
    },
  
    dateOfArrival: {
        type: Date,
        //required: [true, 'Date of arrival must be specified'],
        default: Date.now
    },
    healthStatus: {
        type: String,
        enum: ['Healthy', 'Sick', 'Injured', 'Recovering'],
        default: 'Healthy'
    },

    age: {
        type: Number,
        min: [0, "Age can't be negative"],
        //required: [true, 'Age must be specified'],
        default:30
    },
    gender: {
        type: String,
        enum: ['Male', 'Female'],
        //required: [true, 'Gender must be specified'],
        default:'Male'
    },
    
});


const AnimalModel=mongoose.model('Animals',sch)

module.exports=AnimalModel