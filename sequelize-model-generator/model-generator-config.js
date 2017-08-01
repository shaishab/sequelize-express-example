module.exports = {
  database: {
    "username": "postgres",
    "password": "admin",
    "dbname": "postgres",
    "host": "localhost",
    "dialect": "postgres",
    "port": "5432",
    "schema": "public"
  },
  tables: ['Users'],
  directory: './app/models'
};
