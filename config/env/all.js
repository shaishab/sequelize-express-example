'use strict';

module.exports = {
  app: {
    title: 'sequelize-express-example service',
    description: 'sequelize-express-example Service',
    keywords: ['express', 'sequelize', 'postgress']
  },
  sessionSecret: 'super.secret.key.shhh',
  port: process.env.PORT || 3000
};