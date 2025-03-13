const express = require('express');
const AuthController = require('./../controllers/authController');
const userController = require('./../controllers/userController');
const Router = express.Router();

Router.route('/').get(userController.getAllUser).post(userController.postUser);
Router.route('/filter').get(userController.getFilterUser);
Router.route('/:id').get(userController.getUser).patch(userController.editUser).delete(userController.deleteUser);

module.exports = Router;