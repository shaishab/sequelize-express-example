var User  = require('../models').Users,
  Promise = require('bluebird'),
  errorResolver = require('../helpers/errorResolver');

exports.list = function (req, res) {
  Promise.coroutine(function*() {
    try {
      var users = yield User.findAll({where:{},limit:10});
      return res.status(200).send({success: true, users: users});
    } catch (err) {
      return res.status(200).send({success: false, error: errorResolver.resolve(err)});
    }
  })();
};

exports.create = function(req, res) {
  Promise.coroutine(function*() {
    try {
      var newUser = User.build(req.body);
      var savedUser = yield newUser.save();
      return res.status(200).send({success: true, user: savedUser});
    } catch (err) {
      return res.status(200).send({success: false, error: errorResolver.resolve(err)});
    }
  })();
};

exports.read = function (req, res) {
  Promise.coroutine(function*() {
    try {
      var user = yield User.findOne({where: {id: req.params.id}});
      return res.status(200).send({success: true, user: user});
    } catch (err) {
      return res.status(200).send({success: false, error: errorResolver.resolve(err)});
    }
  })();
};

exports.update = function (req, res) {
  Promise.coroutine(function*() {
    try {
      var updatedUser = yield User.update(req.body, {where: {id: req.params.id}, returning:true});
      return res.status(200).send({success: true, users: updatedUser});
    } catch (err) {
      return res.status(200).send({success: false, error: errorResolver.resolve(err)});
    }
  })();
};

exports.delete = function (req, res) {
  Promise.coroutine(function*() {
    try {
      var deletedUser = yield User.destroy({where: {id: req.params.id}});
      if(!deletedUser) {
        return res.status(200).send({success: false, message: 'Invalid user id'});
      }
      return res.status(200).send({success: true, message: 'success'});
    } catch (err) {
      return res.status(200).send({success: false, error: errorResolver.resolve(err)});
    }
  })();
};