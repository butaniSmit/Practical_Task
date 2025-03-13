const AppError = require('../utils/appError');
const Student = require('./../models/studentModel');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');



exports.postStudent = catchAsync(async (req, res, next) => {
    const newStudent = await Student.create(req.body);

    res.status(201).json({
        status: 'success',
        data: {
            student: newStudent
        }
    });
});


exports.getAllStudent = catchAsync(async (req, res, next) => {
    const features = new APIFeatures(Student.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();
    const students = await features.query;
    res.status(200).json({
        status: 'success',
        result: students.length,
        data: {
            students
        }
    })
});