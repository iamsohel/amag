const Sequelize = require('sequelize');
const dbURI = require('../config/keys').DBURI;

module.exports = function() {
  // Option 1: Passing parameters separately
  // const sequelize = new Sequelize('database', 'username', 'password', {
  //   host: 'localhost',
  //   dialect: 'mysql'
  // });

  // Option 2: Passing a connection URI
   const sequelize = new Sequelize(dbURI);
}