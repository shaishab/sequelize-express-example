'use strict';

var articleController = require('../controllers/article.server.controller');
var jwtAuth          = require('./middlewares/jwtAuth');
var config           = require('../../config/config');

module.exports = function(app) {
  // User API
  var baseUrl = config.app.baseUrl;
  var currentVersion = config.app.currentVersion;
  var url = baseUrl+currentVersion;

  app.route(url + ':userId/articles')
    .post(articleController.create);

  app.route(url + 'articles')
    .get(articleController.list)
    .post(articleController.create);

  app.route(url + 'articles/:id')
    .get(articleController.read)
    .put(articleController.update)
    .delete(articleController.delete);
};

