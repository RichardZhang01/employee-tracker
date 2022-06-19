const mysql = require('mysql2');
const cTable = require('console.table');
const inquirer = require('inquirer');

const { 
  menuPrompt, 
  addDepartmentPrompt,
  addRolePrompt,
  addEmployeePrompt,
  deleteDepartmentPrompt,
  deleteRolePrompt,
  deleteEmployeePrompt,
  updateEmployeeRolePrompt,
  updateEmployeeManagerPrompt,
  viewByManagerPrompt,
  viewByDepartmentPrompt,
  viewDepartmentBudgetPrompt 
} = require('./helpers/prompts.js');
const { 
  departmentsTableQuery, 
  rolesTableQuery, 
  employeesTableQuery,
  employeesByManagerQuery,
  employeesByDepartmentQuery,
  budgetByDepartmentQuery,
  getEmployeesQuery,
  getRolesQuery,
  getManagersQuery,
  insertDepartmentQuery,
  insertRoleQuery,
  insertEmployeeQuery,
  deleteDepartmentQuery,
  deleteRoleQuery,
  deleteEmployeeQuery,
  updateEmployeeRoleQuery,
  updateEmployeeManagerQuery 
} = require('./helpers/queries.js');

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

        case 'View Employees By Manager':
          displayEmployeesByManager();
          break;

        case 'View Employees By Department':
          displayEmployeesByDepartment();
          break;

        case 'Add Employee':
          addEmployee();
          break;

        case 'Update Employee Role':
          updateEmployeeRole();
          break;

        case 'Update Employee Manager':
          updateEmployeeManager();
          break;

        case 'Delete Employee':
          deleteEmployee();
          break;

        case 'View All Roles':
          displayTable('Roles');
          break;

        case 'Add Role':
          addRole();
          break;

        case 'Delete Role':
          deleteRole();
          break;

        case 'View All Departments':
          displayTable('Departments');
          break;

        case 'Add Department':
          addDepartment();
          break;

        case 'Delete Department':
          deleteDepartment();
          break;
        
        case 'View Total Utilized Budget By Department':
          displayBudget();
          break;

        case 'Quit':
          quit();
          break;

        default:
          console.error('Error handling menu selection')
          break;
      };
    })
    .catch(err => console.error(err))

};

const displayTable = (query) => {

  let table;
  console.log('\n');

  switch (query) {
    case 'Employees':
      table = employeesTableQuery;
      break;
    case 'Roles':
      table = rolesTableQuery;
      break;
    case 'Departments':
      table = departmentsTableQuery;
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

const displayEmployeesByManager = () => {

  let managers = [];

  db.query(getManagersQuery, (err, results) => {
    err ? console.error(err) : managers = results;

    const managerNames = managers.map(manager => manager.name);

    inquirer
    .prompt(viewByManagerPrompt(managerNames))
      .then(({ managerName }) => {

        console.log('\n');

        db.query(employeesByManagerQuery(managerName), (err, results) => {
          err ? console.error(err) : console.table(results);
          displayMenu();
        })
      })
      .catch(err => console.error(err)
      );
  });

};

const displayEmployeesByDepartment = () => {

  let departments = [];

  db.query(departmentsTableQuery, (err, results) => {
    err ? console.error(err) : departments = results;

    const departmentNames = departments.map(department => department.name);

    inquirer
    .prompt(viewByDepartmentPrompt(departmentNames))
      .then(({ departmentName }) => {

        console.log('\n');

        db.query(employeesByDepartmentQuery(departmentName), (err, results) => {
          
          if (err) {
            console.error(err);
          } else {
            (!results.length) ? console.log("\x1b[31mThere are no employees in that department\x1b[0m") : console.table(results);
          };

          displayMenu();
        });
      })
      .catch(err => console.error(err)
      );
  });

};

const displayBudget = () => {

  let departments = [];

  db.query(departmentsTableQuery, (err, results) => {
    err ? console.error(err) : departments = results;

    const departmentNames = departments.map(department => department.name);

    inquirer
    .prompt(viewDepartmentBudgetPrompt(departmentNames))
      .then(({ departmentName }) => {

        console.log('\n');

        db.query(budgetByDepartmentQuery(departmentName), (err, results) => {
          
          if (err) {
            console.error(err);
          } else {
            (!results.length) ? console.log(`\x1b[31mThe ${departmentName} department has not utilized any of their budget\x1b[0m`) : console.table(results);
          };

          displayMenu();
        });
      })
      .catch(err => console.error(err)
      );
  });

};

const addDepartment = () => {

  inquirer
  .prompt(addDepartmentPrompt)
    .then (({ newDepartment }) => {
        db.query(insertDepartmentQuery(newDepartment), (err, results) => {
          err ? console.error(err) : console.log(`Added ${newDepartment} department to the database\n`);
          displayMenu();
        });
    })
    .catch(err => console.error(err)
    );

};

const addRole = () => {

  let departments = [];

  db.query(departmentsTableQuery, (err, results) => {
    err ? console.error(err) : departments = results;

    const departmentNames = departments.map(department => department.name);

    inquirer
    .prompt(addRolePrompt(departmentNames))
      .then(({ roleName, roleSalary, roleDepartment }) => {

        let departmentID;
        departments.forEach((department) => {
          if(department.name === roleDepartment) departmentID = department.id;
        });

        db.query(insertRoleQuery(roleName, roleSalary, departmentID), (err, results) => {
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

  db.query(getEmployeesQuery, (err, results) => {
    err ? console.error(err) : employees = results;
    
    const employeeNames = employees.map(employee => employee.name);
    employeeNames.unshift('None');
    let roles;

    db.query(getRolesQuery, (err, results) => {
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

        db.query(insertEmployeeQuery(employeeFirstName, employeeLastName, roleID, managerID), (err, results) => {
          err ? console.error(err) : console.log(`Added employee ${employeeFirstName} ${employeeLastName} to the database\n`);
          displayMenu();
        })
      })
      .catch(err => console.error(err)
      );

    });

  });

};

const deleteDepartment = () => {

  let departments = [];

  db.query(departmentsTableQuery, (err, results) => {
    err ? console.error(err) : departments = results;

    const departmentNames = departments.map(department => department.name);

    inquirer
    .prompt(deleteDepartmentPrompt(departmentNames))
      .then(({ departmentName, confirm }) => {

        if(confirm) {

          let departmentID;
          departments.forEach((department) => {
            if(department.name === departmentName) departmentID = department.id;
          });

          db.query(deleteDepartmentQuery(departmentID), (err, results) => {
            err ? console.error(err) : console.log(`Deleted ${departmentName} department from the database\n`);
            displayMenu();
          })

        } else {

          console.log('Deletion cancelled');
          displayMenu();

        }

      })
      .catch(err => console.error(err)
      );
  });

};

const deleteRole = () => {

  let roles = [];

  db.query(getRolesQuery, (err, results) => {
    err ? console.error(err) : roles = results;

    const roleNames = roles.map(role => role.title);

    inquirer
    .prompt(deleteRolePrompt(roleNames))
      .then(({ roleName, confirm }) => {

        if(confirm) {

          let roleID;
          roles.forEach((role) => {
            if(role.title === roleName) roleID = role.id;
          });

          db.query(deleteRoleQuery(roleID), (err, results) => {
            err ? console.error(err) : console.log(`Deleted ${roleName} role from the database\n`);
            displayMenu();
          })

        } else {

          console.log('Deletion cancelled');
          displayMenu();

        }

      })
      .catch(err => console.error(err)
      );
  });
  
};

const deleteEmployee = () => {

  let employees = [];

  db.query(getEmployeesQuery, (err, results) => {
    err ? console.error(err) : employees = results;

    const employeeNames = employees.map(employee => employee.name);

    inquirer
    .prompt(deleteEmployeePrompt(employeeNames))
      .then(({ employeeName, confirm }) => {

        if(confirm) {

          let employeeID;
          employees.forEach((employee) => {
            if(employee.name === employeeName) employeeID = employee.id;
          });

          db.query(deleteEmployeeQuery(employeeID), (err, results) => {
            err ? console.error(err) : console.log(`Deleted employee ${employeeName} from the database\n`);
            displayMenu();
          })

        } else {

          console.log('Deletion cancelled');
          displayMenu();

        }

      })
      .catch(err => console.error(err)
      );
  });
  
};

const updateEmployeeRole = () => {

  let employees = [];

  db.query(getEmployeesQuery, (err, results) => {
    err ? console.error(err) : employees = results;
    
    const employeeNames = employees.map(employee => employee.name);
    let roles;

    db.query(getRolesQuery, (err, results) => {
      err ? console.error(err) : roles = results;
      
      const roleTitles = roles.map(role => role.title);
    
      inquirer
      .prompt(updateEmployeeRolePrompt(employeeNames, roleTitles))
      .then(({ employeeName, newRole }) => {

        let newRoleID;
        roles.forEach((role) => {
          if(role.title === newRole) newRoleID = role.id;
        });

        let employeeID;
        employees.forEach((employee) => {
          if(employee.name === employeeName) employeeID = employee.id;
        });

        db.query(updateEmployeeRoleQuery(employeeID, newRoleID), (err, results) => {
          err ? console.error(err) : console.log(`Updated employee ${employeeName}'s role to ${newRole}\n`);
          displayMenu();
        })
      })
      .catch(err => console.error(err)
      );

    });

  });

};

const updateEmployeeManager = () => {

  let employees = [];

  db.query(getEmployeesQuery, (err, results) => {
    err ? console.error(err) : employees = results;
    
    const employeeNames = employees.map(employee => employee.name);
    const managerNames = employees.map(employee => employee.name);
    managerNames.unshift("None");
    
      inquirer
      .prompt(updateEmployeeManagerPrompt(employeeNames, managerNames))
      .then(({ employeeName, newManager }) => {

        let newManagerID = null;
        employees.forEach((manager) => {
          if(manager.name === newManager) newManagerID = manager.id;
        });

        let employeeID;
        employees.forEach((employee) => {
          if(employee.name === employeeName) employeeID = employee.id;
        });

        db.query(updateEmployeeManagerQuery(employeeID, newManagerID), (err, results) => {
          err ? console.error(err) : console.log(`Updated employee ${employeeName}'s manager to ${newManager}\n`);
          displayMenu();
        })
      })
      .catch(err => console.error(err)
      );

  });

};

const quit = () => {
  console.log("\x1b[32mGoodbye!\x1b[0m");
  process.exit();
};

const init = () => {
  displayMenu();
};

init();