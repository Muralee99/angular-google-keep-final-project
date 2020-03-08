const express = require('express');
var cors = require('cors')

function generateApp(inputApp) {
  const app = inputApp || express();
  
  app.use(cors())

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
    	"Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');    
    next();
  });

  app.use(require('./api'));

  return app;
}

module.exports = generateApp;
