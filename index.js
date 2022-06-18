const mysql = require('mysql2');
const cTable = require('console.table');
const inquirer = require('inquirer');

const { menuPrompt } = require('./helpers/questions.js');
const { DepartmentsTable, RolesTable, EmployeesTable } = require('./helpers/queries.js');

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'MySQL',
      database: 'employees_db'
    },
    console.log(`Connected to the employees_db database.`)
);

const displayMenu = () => {

  inquirer
  .prompt(menuPrompt)
    .then(({ menu: selection }) => {

      switch (selection) {
        case 'View All Employees':
          displayTable(selection);
          break;

        case 'Add Employee':
          
          break;

        case 'Update Employee Role':
          
          break;

        case 'View All Roles':
          displayTable(selection);
          break;

        case 'Add Role':
          
          break;

        case 'View All Departments':
          displayTable(selection);
          break;

        case 'Add Department':
          
          break;

        case 'Quit':
          
          break;

        default:
          console.error('Error handling menu selection')
          break;
      };

    });

};

displayTable = (query) => {

  let table;

  console.log('\n');

  switch (query) {
    case 'View All Employees':
      table = EmployeesTable;
      break;
    case 'View All Roles':
      table = RolesTable;
      break;
    case 'View All Departments':
      table = DepartmentsTable;
      break;
    default:
      console.error('invalid table');
      break;
  }

  db.query(table, (err, results) => {    
    err ? console.error(err) : console.table(results);
    displayMenu();
  });

};

const init = () => {
  displayMenu();
}

init();