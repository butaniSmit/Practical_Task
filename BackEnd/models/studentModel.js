const mongoose = require('mongoose');
const validator = require('validator');
var uniqueValidator = require('mongoose-unique-validator');
const studentSchema = new mongoose.Schema(
    {
        first_name: {
            type: String,
            unique: true,
            trim: true,
            required: [true, 'First Name is required']
          },
          last_name: {
            type: String,
            trim: true,
            required: [true, 'Last Name is required']
          },
          email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            trim: true,
            lowercase: true,
            validate: [validator.isEmail, 'Please provide a valid email'],
          },
          phone:{
            type:Number,
            required: [true, 'Phone Number is required'],
          },
          date:{
            type:Date,
            required: [true, 'Date is required'],
          }
    }
)

studentSchema.plugin(uniqueValidator, { message: '{PATH} already exists' });
const Student = mongoose.model('Student', studentSchema);

module.exports = Student;