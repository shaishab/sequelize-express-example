'use strict';

var userController = require('../controllers/user.server.controller');
var jwtAuth          = require('./middlewares/jwtAuth');
var config           = require('../../config/config');

module.exports = function(app) {
  // User API
  var baseUrl = config.app.baseUrl;
  var currentVersion = config.app.currentVersion;
  var url = baseUrl+currentVersion;

  app.route(url + 'users')
    .get(userController.list)
    .post(userController.create);

  app.route(url + 'users/:id')
    .get(userController.read)
    .put(userController.update)
    .delete(userController.delete);
};

