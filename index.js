const mysql = require('mysql2');
const cTable = require('console.table');
const inquirer = require('inquirer');

const { 
  menuPrompt, 
  addDepartmentPrompt,
  addRolePrompt,
  addEmployeePrompt } 
  = require('./helpers/questions.js');
const { 
  departmentsTable, 
  rolesTable, 
  employeesTable,
  getEmployees,
  getRoles,
  insertDepartment,
  insertRole,
  insertEmployee } 
  = require('./helpers/queries.js');

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
          displayTable('Employees');
          break;

        case 'Add Employee':
          addEmployee();
          break;

        case 'Update Employee Role':
          
          break;

        case 'View All Roles':
          displayTable('Roles');
          break;

        case 'Add Role':
          addRole();
          break;

        case 'View All Departments':
          displayTable('Departments');
          break;

        case 'Add Department':
          addDepartment();
          break;

        case 'Quit':
          
          break;

        default:
          console.error('Error handling menu selection')
          break;
      };
    })
    .catch(err => console.error(err))

};

displayTable = (query) => {

  let table;
  console.log('\n');

  switch (query) {
    case 'Employees':
      table = employeesTable;
      break;
    case 'Roles':
      table = rolesTable;
      break;
    case 'Departments':
      table = departmentsTable;
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

const addDepartment = () => {

  inquirer
  .prompt(addDepartmentPrompt)
    .then (({ newDepartment }) => {
        db.query(insertDepartment(newDepartment), (err, results) => {
          err ? console.error(err) : console.log(`Added ${newDepartment} department to the database\n`);
          displayMenu();
        });
    })
    .catch(err => console.error(err)
    );

};

const addRole = () => {

  let departments = [];

  db.query(departmentsTable, (err, results) => {
    err ? console.error(err) : departments = results;

    const departmentNames = departments.map(department => department.name);

    inquirer
    .prompt(addRolePrompt(departmentNames))
      .then(({ roleName, roleSalary, roleDepartment }) => {

        let departmentID;
        departments.forEach((department) => {
          if(department.name === roleDepartment) departmentID = department.id;
        });

        db.query(insertRole(roleName, roleSalary, departmentID), (err, results) => {
          err ? console.error(err) : console.log(`Added ${roleName} role to the database\n`);
          displayMenu();
        })
      })
      .catch(err => console.error(err)
      );
  });

};

const addEmployee = () => {
  
  let employees = [];

  db.query(getEmployees, (err, results) => {
    err ? console.error(err) : employees = results;
    
    const employeeNames = employees.map(employee => employee.name);
    employeeNames.unshift('None');
    let roles;

    db.query(getRoles, (err, results) => {
      err ? console.error(err) : roles = results;
      
      const roleTitles = roles.map(role => role.title);
    
      inquirer
      .prompt(addEmployeePrompt(employeeNames, roleTitles))
      .then(({ employeeFirstName, employeeLastName, employeeRole, employeeManager }) => {

        let roleID;
        roles.forEach((role) => {
          if(role.title === employeeRole) roleID = role.id;
        });

        let managerID = null;
        employees.forEach((employee) => {
          if(employee.name === employeeManager) managerID = employee.id;
        });

        console.log(roleID, managerID);

        db.query(insertEmployee(employeeFirstName, employeeLastName, roleID, managerID), (err, results) => {
          err ? console.error(err) : console.log(`Added employee ${employeeFirstName} ${employeeLastName} to the database\n`);
          displayMenu();
        })
      })
      .catch(err => console.error(err)
      );

    });

  });

};

const init = () => {
  displayMenu();
};

init();