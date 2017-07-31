var logger = require('../helpers/logger');  

exports.logMessage = function(level, logMsg){
  logger.log(level, logMsg,{});
};