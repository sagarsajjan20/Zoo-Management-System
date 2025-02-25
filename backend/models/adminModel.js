const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        validate: {
            validator: validator.isEmail,
            message: "Validation failed for email"
        }
    },
    password: {
        type: String,
        required: true,
        minlength: [8, "Password length must be >= 8"],
        select: false
    },
    checkpassword: {
        type: String,
        // Uncomment if needed
        // required: true,
        // validate: {
        //     // Only works for create and save
        //     validator: function(el) {
        //         return el === this.password;
        //     },
        //     message: "Passwords do not match"
        // }
    },
    salary: {
        type: Number,
        required: [true, 'Salary is required']
    },
    phNo: {
        type: String,
        required: [true, 'Phone number is required'],
        validate: {
            validator: function(v) {
                return /\d{10}/.test(v); // Adjust the regex based on your phone number format
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    }
}, { minimize: false });

adminSchema.pre("save", async function(next) {
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);
    this.checkpassword = undefined;
    next();
});

adminSchema.methods.passcheck = async function(p_input, p_actual) {
    return await bcrypt.compare(p_input, p_actual);
};

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
