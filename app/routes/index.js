/**
 * Created by Shaishab on 6/8/2017.
 */
'use strict';

var config           = require('../../config/config');

module.exports = function(app) {
  // User API
  var baseUrl = config.app.baseUrl;
  var currentVersion = config.app.currentVersion;
  var url = baseUrl+currentVersion;

  app.route(url + '/')
    .get(function(req, res) {
      return res.status(200).send("Welcome :) .Your application has been started successfully!");
    })
};

