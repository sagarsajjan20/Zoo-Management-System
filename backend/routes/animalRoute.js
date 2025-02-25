const express = require("express");
const animal = require('../Controllers/AnimalController');
const multer = require('multer');

const foodRouter = express.Router();

// Image storage engine
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

foodRouter.post('/add', upload.single("img"), animal.addAnimals);
foodRouter.get('/list',animal.listAnimals)
foodRouter.post('/remove',animal.DelAnimal)
module.exports = foodRouter;
