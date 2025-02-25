const AnimalModel = require('../models/animalModel');
const catchErr = require("../utils/catchasync");
const fs=require('fs')

// Add animals
exports.addAnimals = catchErr(async (req, res, next) => {
    if (!req.file) {
        return res.status(400).json({ status: "fail", message: "No image file provided" });
    }
    
    const { name, info, type, cageNo, dateOfArrival, healthStatus, age, gender } = req.body;
    const imageName = req.file.filename;

    const animal = await AnimalModel.create({
        name,
        info,
        type,
        img: imageName,
        cageNo,
        dateOfArrival,
        healthStatus,
        age,
        gender
    });

    res.status(200).json({
        status: "success",
        data: animal,
        message:"Animal added"
    });
});

//display animals
exports.listAnimals = catchErr(async (req, res, next) => {
    
    const data= await AnimalModel.find({})
    res.status(200).json({
        status:"success",
        data
    })
});

//delete animal
exports.DelAnimal = catchErr(async (req, res, next) => {
    
    const data= await AnimalModel.findById(req.body.id)
    fs.unlink(`uploads/${data.img}`,()=>{})

    await AnimalModel.findByIdAndDelete(req.body.id)
    res.status(200).json({
        status:"success",
        data:"animal was deleted"
    })

});
