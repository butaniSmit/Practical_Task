const crypto = require('crypto')
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt= require('bcryptjs')
var uniqueValidator = require('mongoose-unique-validator');
const { type } = require('os');
const userSchema = new mongoose.Schema({
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
  name:{
    type:String
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  role: {
    type: String,
    default: 'admin'
  },
  permissions: { type: String, ref: 'roles' },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6,
    select: false
  },
  confirmpassword: {
    type: String,
    required: [true, 'Confirm Password is required'],
    validate: {
      // This only works on CREATE and SAVE!!!
      validator: function(el) {
        return el = this.password;
      },
      message: 'Passwords are not the same!'
    }
  }
});
userSchema.pre('save', async function(next) {
    // Only run this function if password was actually modified
    if (!this.isModified('password')) return next();
  
    // Hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);
  
    // Delete passwordConfirm field 
    this.confirmpassword = undefined;
    next();
  });

  userSchema.pre('updateOne', async function(next) {
    // Only run this function if password was actually modified
    const data = this.getUpdate()
    if(data.password){
      data.password = await bcrypt.hash(data.password, 12);
      // this.update({}, data).exec()
      // Delete passwordConfirm field 
      data.confirmpassword = undefined;
    }
    next();
  });

userSchema.methods.correctPassword = async function(
    candidatePassword,
    userPassword
  ) {
    return await bcrypt.compare(candidatePassword, userPassword);
  };
userSchema.plugin(uniqueValidator, { message: '{PATH} already exists' });
const User = mongoose.model('User', userSchema);

module.exports = User;
