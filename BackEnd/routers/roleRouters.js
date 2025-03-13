const express = require('express');
const roleController = require('./../controllers/roleController');
const Router = express.Router();


Router.route('/').get(roleController.getAllRole)
    .post(roleController.postRole);

Router.route('/:id').get(roleController.getRole).patch(roleController.editRole).delete(roleController.deleteRole);

module.exports = Router;