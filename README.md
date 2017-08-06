# Sequelize Express Example
An example for the usage of Sequelize within an [Express.js](http://expressjs.com/) application and for database used [PostgreSQL](https://www.postgresql.org/) . This repository structure followed **MEAN** stack project structure and usages of model like **mongoose** so if you are familiar with mongoose then you can easily go through the codes. In this project also used [bluebird](http://bluebirdjs.com/docs/getting-started.html) to promisify so you can execute your code synchronously using **yield** keyword.


# Starting App

    npm install
    npm start

This will start the application and create tables **Users** and **Articles** in **Public** schema of **PostgreSQl** database. Just open http://localhost:3000/api/v1.0/ and you will see welcome message.


# Generate models from existing tables
To generate models from your existing tables go to _**sequelize-model-generator**_ directory and update **model-generator-config.js** file to set your **DB** information and in **tables** field set the table name for that tables you want to generate schema.
and run the command

    node sequelize-model-generator/generate-model-from-db-table.js

# Postman test
To test the **API** you can import test cases in postman from **postman-test** directory that will show all test for **User** and **Article** models **CRUD** operations. After run the project you can test all API.