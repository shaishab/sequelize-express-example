'use strict';

/**
 * Module dependencies.
 */
var fs = require('fs'),
  	http = require('http'),
  	https = require('https'),
  	express = require('express'),
  	bodyParser = require('body-parser'),
  	compress = require('compression'),
  	config = require('./config'),
  	path = require('path'),
    logger = require('../app/helpers/logger'),
    expressValidator = require('express-validator'),
    cors   = require("cors");

module.exports = function(db) {
	// Initialize express app
	var app = express();

	app.use(cors());

	// Setting application local variables
	app.locals.title = config.app.title;


	// Passing the request url to environment locals
	app.use(function(req, res, next) {
		res.locals.url = req.protocol + '://' + req.headers.host + req.url;
		next();
	});

	// Should be placed before express.static
	app.use(compress({
		filter: function(req, res) {
			return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
		},
		level: 9
	}));

	// Showing stack errors
	app.set('showStackError', true);

	// Request body parsing middleware should be above methodOverride
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(bodyParser.json({limit: '5mb'}));

	// Setting the app router and static folder
	// app.use(express.static(path.resolve('./public')));
	//Log All the request here
	app.use(function(req, res, next) {
  	// Put some preprocessing here.
  	logger.info(req.method + ' ' + req.url + ' body ' + JSON.stringify(req.body) + ' params ' + JSON.stringify(req.params));
  	next();
	});

	// use for field validation and customizing the messages
	app.use(expressValidator({
	  errorFormatter: function(param, msg, value) {
	    return {
	 			message: msg
	    };
	  }
	}));	

	// Globbing routing files
	config.getGlobbedFiles('./app/routes/**/*.js').forEach(function(routePath) {
    // skip middlewares as it is not a routese
    if( routePath.indexOf("middlewares") == -1)
    {
        require(path.resolve(routePath))(app);
    }
	});

  app.set('json spaces', 2);
  app.set('jwtTokenSecret', 'jwt-secret-key');

	// Assume 'not found' in the error msgs is a 404. this is somewhat silly, but valid, you can do whatever you like, set properties, use instanceof etc.
	app.use(function(err, req, res, next) {
		// If the error object doesn't exists
		if (!err) return next();

		// Log it
		logger.error(err.stack);

		// Error page
		res.status(500).send('Error Please see log for details.');
		/*
		res.status(500).render('500', {
			message: err.message,
			error: err.stack
		});
		*/
	});

	// Assume 404 since no middleware responded
	app.use(function(req, res) {
		//console.log('Actual status is ' + res );
		res.status(404).send('Uknown Error');
		/* res.status(404).render('404', {
			url: req.originalUrl,
			error: 'Not Found'
		}); */
	});

	if (process.env.NODE_ENV === 'secure') {
		// Log SSL usage
		console.log('Securely using https protocol');

		// Load SSL key and certificate
		var privateKey = fs.readFileSync('./config/sslcerts/key.pem', 'utf8');
		var certificate = fs.readFileSync('./config/sslcerts/cert.pem', 'utf8');

		// Create HTTPS Server
		var httpsServer = https.createServer({
			key: privateKey,
			cert: certificate
		}, app);

		// Return HTTPS server instance
		return httpsServer;
	}

	// Return Express server instance
	return app;
};