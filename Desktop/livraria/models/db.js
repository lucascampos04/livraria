const Sequelize = require('sequelize');

// Configuração da conexão com o banco de dados Mysql
const sequelize = new Sequelize('livraria', 'root', '56405266885', {
    host: 'localhost',
    dialect: 'mysql'
  });

  module.exports = {
    Sequelize : Sequelize,
    sequelize : sequelize
  }