var models  = require('../models'),
  Article   = models.Article,
  Promise   = require('bluebird'),
  errorResolver = require('../helpers/errorResolver');

exports.list = function (req, res) {
  Promise.coroutine(function*() {
    try {
      var articles = yield Article.findAll({where:{},limit:10});
      return res.status(200).send({success: true, articles: articles});
    } catch (err) {
      return res.status(200).send({success: false, error: errorResolver.resolve(err)});
    }
  })();
};

exports.create = function(req, res) {
  Promise.coroutine(function*() {
    try {
      var newArticle = Article.build(req.body);
      newArticle.UserId = req.params.userId;
      var savedArticle = yield newArticle.save();
      return res.status(200).send({success: true, article: savedArticle});
    } catch (err) {
      return res.status(200).send({success: false, error: errorResolver.resolve(err)});
    }
  })();
};

exports.read = function (req, res) {
  Promise.coroutine(function*() {
    try {
      var article = yield Article.findOne({where: {id: req.params.id}, include: [{ model: models.User }]});
      return res.status(200).send({success: true, article: article});
    } catch (err) {
      return res.status(200).send({success: false, error: errorResolver.resolve(err)});
    }
  })();
};

exports.update = function (req, res) {
  Promise.coroutine(function*() {
    try {
      var updatedArticle = yield Article.update(req.body, {where: {id: req.params.id}, returning:true});
      return res.status(200).send({success: true, articles: updatedArticle});
    } catch (err) {
      return res.status(200).send({success: false, error: errorResolver.resolve(err)});
    }
  })();
};

exports.delete = function (req, res) {
  Promise.coroutine(function*() {
    try {
      var deletedArticle = yield Article.destroy({where: {id: req.params.id}});
      if(!deletedArticle) {
        return res.status(200).send({success: false, message: 'Invalid article id'});
      }
      return res.status(200).send({success: true, message: 'success'});
    } catch (err) {
      return res.status(200).send({success: false, error: errorResolver.resolve(err)});
    }
  })();
};