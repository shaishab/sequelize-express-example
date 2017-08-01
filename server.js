'use strict';
/**
 * Module dependencies.
 */
var init = require('./config/init')(),
    config = require('./config/config'),
    Promise = require('bluebird'),
    logger = require('./app/helpers/logger'),
    db = require('./app/models');

Promise.coroutine(function*(){

  // Init the express application
  var app = require('./config/express')();

  db.sequelize.authenticate()
    .then(() => {
      console.log('Connection has been established successfully.');
      app.listen(config.port);
      app.on('error', onError);
      app.on('listening', onListening);
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
    });

  // Expose app
  module.exports = app;

  /**
   * Event listener for HTTP server "error" event.
   */

  function onError(error) {
    if (error.syscall !== 'listen') {
      throw error;
    }

    var bind = typeof port === 'string'
      ? 'Pipe ' + port
      : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);
        break;
      default:
        throw error;
    }
  }

  /**
   * Event listener for HTTP server "listening" event.
   */

  function onListening() {
    var addr = app.address();
    var bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;
    debug('Listening on ' + bind);
  }

})().catch(function(err){
  logger.error(err);
  logger.error('Could not start app !')
});
