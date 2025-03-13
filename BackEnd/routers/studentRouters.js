const express = require('express');
const studentController = require('./../controllers/studentController');
const Router = express.Router();

Router.route('/').get(studentController.getAllStudent)
    .post(studentController.postStudent);

module.exports = Router;