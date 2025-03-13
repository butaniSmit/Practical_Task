const rolesModel = require("../models/rolesModel");
const User = require("../models/userModel");
const APIFeatures = require("../utils/apiFeatures");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const bcrypt = require('bcryptjs');

exports.getAllUser = catchAsync(async (req, res, next) => {
    
    let total ={}
    let users = {};
            const features = new APIFeatures(User, req.query)
            .customFilter()
            .sort()
            .paginate();
        users = await features.query;
        if(req.query.name){
            const features = new APIFeatures(User, req.query)
            .customFilter()
            total = await features.query;
        }else{
            total = await User.find();
        }
    res.status(200).json({
        status: 'success',
        result: total.length,
        datalength: users.length,
        data: {
            users
        }
    })
});

exports.getFilterUser = catchAsync(async (req, res, next) => {
    const userData = await User.find();
    //filter
    console.log("req.query", req.query)
    let match = {};
    if (req.query.name) {
        match.$or = [
            { name: new RegExp(req.query.name, 'i') }
        ]
    }
    if (req.query.email) {
        match.$or = [
            { email: new RegExp(req.query.email, 'i') }
        ]
    }
    const users = await User.aggregate([{ $match: match }])
    console.log("users", users)

    res.status(200).json({
        status: 'success',
        result: userData.length,
        datalength: users.length,
        data: {
            users
        }
    })
});

exports.postUser = catchAsync(async (req, res, next) => {
    const first_name = req.body.first_name
    const last_name = req.body.last_name
    const email = req.body.email
    const password = req.body.password
    const confirmpassword = req.body.confirmpassword
    const role = req.body.role || 'user';
    const name = `${req.body.first_name + ' ' + req.body.last_name}` || ''
    const roleData = await rolesModel.findOne({ role: role })
    const permissions = roleData?._id
    const newUser = await User.create({ first_name, last_name, name, email, password, confirmpassword, role, permissions });

    res.status(201).json({
        status: 'success',
        message: 'Data Added successfully',
        data: {
            user: newUser
        }
    });
})

exports.editUser = catchAsync(async (req, res, next) => {
    const first_name = req.body.first_name
    const last_name = req.body.last_name
    const email = req.body.email
    const password = req.body.password;
    const role = req.body.role || 'user';
    const name = `${first_name + ' ' + last_name}` || ''
    const roleData = await rolesModel.findOne({ role: role })
    const permissions = roleData?._id
    const user = await User.updateOne({ _id: req.params.id }, { first_name, last_name, name, email, password, role, permissions }, {
        new: true,
        runValidators: true
    })
    if (!user) {
        return next(new AppError('No tour found with that ID', 404))
    }
    res.status(201).json({
        status: 'success',
        message: 'Data Updated successfully',
        data: {
            user
        }
    });
});

exports.getUser = catchAsync(async (req, res, next) => {

    const user = await User.findById(req.params.id);
    if (!user) {
        return next(new AppError('No tour found with that ID', 404))
    }
    //tour.findOne({_id:req.params.id})
    res.status(200).json({
        status: 'success',
        data: {
            user
        }
    })
});

exports.deleteUser = catchAsync(async (req, res, next) => {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
        return next(new AppError('No tour found with that ID', 404))
    }
    res.status(200).json({
        status: "success",
        message: 'Data Deleted successfully'
    });
});