//var User = require('../../models/user.server.model');
var jwt  = require('jwt-simple');

module.exports = function(req, res, next) {
  next();
  //var token = req.headers.banktoken || req.body.bankToken;
  //if(!token) {
  //  return res.sendStatus(401);
  //}
  //
  //try{
  //  //var decoded = jwt.decode(token, require('../../config/secret')());
  //  var decoded = jwt.decode(token, require('../../../config/env/all').sessionSecret);
  //
  //  if (decoded.exp <= Date.now()) {
  //      return res.status(400).json({ message: "Access token has expired." });
  //  }
  //
  //  User.findOne({ _id: decoded.iss }, function(error, user) {
  //      if(error || !user) {
  //          return res.sendStatus(401);
  //      }
  //      req.user = user;
  //      next();
  //  });
  //}catch (err) {
  //     res.sendStatus(500);
  //}
};