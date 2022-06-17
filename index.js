const mysql = require('mysql2');
const cTable = require('console.table');
const inquirer = require('inquirer');

const connection = mysql.createConnection(
    {
      host: 'localhost',
      port: 3001,
      user: 'root',
      password: 'MySQL',
      database: 'employees_db'
    },
    console.log(`Connected to the employees_db database.`)
);