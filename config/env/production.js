'use strict';
module.exports = {
  app: {
    title: 'sequelize-express-example service',
    description: 'sequelize-express-example Service',
    baseUrl: '/api/',
    currentVersion: 'v1.0/'
  },
  database:{
    url: 'postgres://postgres:admin@localhost:5432/postgres'
  },
  logging: {
    deployment: 'production',
    level: 'info'
  }
};