'use strict';

/**
 * Module dependencies.
 */
var glob = require('glob'),
    chalk = require('chalk'),
    config = require('./config');

var logger = require('../app/helpers/logger');      

/**
 * Module init function.
 */
module.exports = function() {
  /**
   * Before we begin, lets set the environment variable
   * We'll Look for a valid NODE_ENV variable and if one cannot be found load the development NODE_ENV
   */
  glob('./config/env/' + process.env.NODE_ENV + '.js', function(err, environmentFiles) {
    if (!environmentFiles.length) {
      if (process.env.NODE_ENV) {
        console.error(chalk.red('No configuration file found for '  + process.env.NODE_ENV +  ' environment using development instead'));
      } else {
        console.error(chalk.red('NODE_ENV is not defined! Using default development environment'));
      }

      process.env.NODE_ENV = 'development';
    } else {
      console.log(chalk.black.bgWhite('Application loaded using the ' + process.env.NODE_ENV + ' environment configuration '));
    }

    if(process.env.NODE_ENV == 'production'){
      logger.remove('console-logging');
      console.log(chalk.red('Removing console logging for production'));
    }

    if(process.env.NODE_ENV == 'test'){
      logger.remove('console-logging');
      //logger.remove('loggly-logging');
      console.log(chalk.red('Removing loggly logging for testing'));
    }    

  });
};