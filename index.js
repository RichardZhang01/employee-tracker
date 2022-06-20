// import libraries
const mysql = require('mysql2');
const cTable = require('console.table');
const inquirer = require('inquirer');
const figlet = require('figlet');

// link to helper files
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

// establish connection to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: '**Your MySQL Password Here**',
      database: 'employees_db'
    },
);

// main menu, links to respective functions
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

// displays the three main tables depending on the user's selection
const displayTable = (selection) => {

  let table;
  console.log('\n');

  switch (selection) {
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

  // queries db for table based on user selection (see switch above)
  db.query(table, (err, results) => {    
    err ? console.error(err) : console.table(results);
    displayMenu();
  });

};

// displays employee table by manager
const displayEmployeesByManager = () => {

  // holds manager names and ids
  let managers = [];

  // queries db for manager data
  db.query(getManagersQuery, (err, results) => {
    // stores manager data
    err ? console.error(err) : managers = results;

    // extracts names only
    const managerNames = managers.map(manager => manager.name);

    // prompts user for manager
    inquirer
    .prompt(viewByManagerPrompt(managerNames))
      .then(({ managerName }) => {

        console.log('\n');

        // displays table, returns to menu
        db.query(employeesByManagerQuery, managerName, (err, results) => {
          err ? console.error(err) : console.table(results);
          displayMenu();
        })
      })
      .catch(err => console.error(err)
      );
  });

};

// displays employee table by department
const displayEmployeesByDepartment = () => {

  // holds department names and ids
  let departments = [];

  // query db for department data
  db.query(departmentsTableQuery, (err, results) => {
    // store department data
    err ? console.error(err) : departments = results;

    // extract department names only
    const departmentNames = departments.map(department => department.name);

    // prompt user for department
    inquirer
    .prompt(viewByDepartmentPrompt(departmentNames))
      .then(({ departmentName }) => {

        console.log('\n');

        // query db for employee table for department
        db.query(employeesByDepartmentQuery, departmentName, (err, results) => {
          
          if (err) {
            console.error(err);
          } else {
            // if no employees in department, log message, else, display table
            (!results.length) ? console.log("\x1b[31mThere are no employees in that department\x1b[0m") : console.table(results);
          };
          // return to menu
          displayMenu();
        });
      })
      .catch(err => console.error(err)
      );
  });

};

// displays total budget table for department
const displayBudget = () => {

  // holds department names and ids
  let departments = [];

  // queries db for department data
  db.query(departmentsTableQuery, (err, results) => {
    // store department data 
    err ? console.error(err) : departments = results;
    // extract department names only
    const departmentNames = departments.map(department => department.name);

    // prompts user for department
    inquirer
    .prompt(viewDepartmentBudgetPrompt(departmentNames))
      .then(({ departmentName }) => {

        console.log('\n');
        // queries db for budget by selected department
        db.query(budgetByDepartmentQuery, departmentName, (err, results) => {
          
          if (err) {
            console.error(err);
          } else {
            // if no utiilized budget, log message, else, display table
            (!results.length) ? console.log(`\x1b[31mThe ${departmentName} department has not utilized any of their budget\x1b[0m`) : console.table(results);
          };
          // return to menu
          displayMenu();
        });
      })
      .catch(err => console.error(err)
      );
  });

};

// add departments
const addDepartment = () => {

  // prompts user for department name to add
  inquirer
  .prompt(addDepartmentPrompt)
    .then (({ newDepartment }) => {
        // queries db to add department
        db.query(insertDepartmentQuery, newDepartment, (err, results) => {
          err ? console.error(err) : console.log(`\x1b[32mAdded ${newDepartment} department to the database\x1b[0m\n`);
          // return to menu
          displayMenu();
        });
    })
    .catch(err => console.error(err)
    );

};

// add roles
const addRole = () => {

  // holds department names and ids
  let departments = [];
  // queries db for department data
  db.query(departmentsTableQuery, (err, results) => {
    // stores department data
    err ? console.error(err) : departments = results;
    // exctract department names only
    const departmentNames = departments.map(department => department.name);
    // prompt user for new role name, its salary, and which department it belongs to
    inquirer
    .prompt(addRolePrompt(departmentNames))
      .then(({ roleName, roleSalary, roleDepartment }) => {

        // get department ID of the department that the new role is being added to
        let departmentID;
        departments.forEach((department) => {
          if(department.name === roleDepartment) departmentID = department.id;
        });
        // queries db to insert new role into its department
        db.query(insertRoleQuery, [roleName, roleSalary, departmentID], (err, results) => {
          err ? console.error(err) : console.log(`\x1b[32mAdded ${roleName} role to the database\x1b[0m\n`);
          // return to menu
          displayMenu();
        })
      })
      .catch(err => console.error(err)
      );
  });

};

// add employees
const addEmployee = () => {
  // holds employee names and ids
  let employees = [];
  // queries db for employee data
  db.query(getEmployeesQuery, (err, results) => {
    // store employee data
    err ? console.error(err) : employees = results;
    // extract employee names only
    const employeeNames = employees.map(employee => employee.name);
    // add a 'None' option
    employeeNames.unshift('None');
    // holes role titles and ids
    let roles;
    // query db for role data
    db.query(getRolesQuery, (err, results) => {
      // store role data
      err ? console.error(err) : roles = results;
      // extract role names only
      const roleTitles = roles.map(role => role.title);
      // prompt user for employee name, role, and manager
      inquirer
      .prompt(addEmployeePrompt(employeeNames, roleTitles))
      .then(({ employeeFirstName, employeeLastName, employeeRole, employeeManager }) => {
        // get role ID of role employee assigned to
        let roleID;
        roles.forEach((role) => {
          if(role.title === employeeRole) roleID = role.id;
        });
        // get employee ID of manager employee is assigned to. null by default (user selects 'None' option)
        let managerID = null;
        employees.forEach((employee) => {
          if(employee.name === employeeManager) managerID = employee.id;
        });
        // query db to insert employee into db
        db.query(insertEmployeeQuery, [employeeFirstName, employeeLastName, roleID, managerID], (err, results) => {
          err ? console.error(err) : console.log(`\x1b[32mAdded employee ${employeeFirstName} ${employeeLastName} to the database\x1b[0m\n`);
          // return to menu
          displayMenu();
        })
      })
      .catch(err => console.error(err)
      );

    });

  });

};

// delete department
const deleteDepartment = () => {
  // holds department names and ids
  let departments = [];
  // queries db for department data
  db.query(departmentsTableQuery, (err, results) => {
    // store department data
    err ? console.error(err) : departments = results;
    // extract department names only
    const departmentNames = departments.map(department => department.name);
    // prompt user for department to delete
    inquirer
    .prompt(deleteDepartmentPrompt(departmentNames))
      .then(({ departmentName, confirm }) => {

        // confirmation check
        if(confirm) {
          // gets department ID of department to be deleted
          let departmentID;
          departments.forEach((department) => {
            if(department.name === departmentName) departmentID = department.id;
          });
          // query db to delete department
          db.query(deleteDepartmentQuery, departmentID,(err, results) => {
            err ? console.error(err) : console.log(`\x1b[32mDeleted ${departmentName} department from the database\x1b[0m\n`);
            // return to menu
            displayMenu();
          })
        // if user cancels, do nothing, log message, return to menu
        } else {

          console.log('\x1b[31mDeletion cancelled\x1b[0m');
          displayMenu();

        }

      })
      .catch(err => console.error(err)
      );
  });

};

// delete role
const deleteRole = () => {
  // holds role names and ids
  let roles = [];
  // queries db for role data
  db.query(getRolesQuery, (err, results) => {
    // store role data
    err ? console.error(err) : roles = results;
    // extract role names only
    const roleNames = roles.map(role => role.title);
    // prompt user for role to delete
    inquirer
    .prompt(deleteRolePrompt(roleNames))
      .then(({ roleName, confirm }) => {
        // confirmation check
        if(confirm) {
          // gets role ID of role to delete
          let roleID;
          roles.forEach((role) => {
            if(role.title === roleName) roleID = role.id;
          });
          // query db to delete role
          db.query(deleteRoleQuery, roleID, (err, results) => {
            err ? console.error(err) : console.log(`\x1b[32mDeleted ${roleName} role from the database\x1b[0m\n`);
            // return to menu
            displayMenu();
          })
        // if user cancels, do nothing, log message, return to menu
        } else {

          console.log('\x1b[31mDeletion cancelled\x1b[0m');
          displayMenu();

        }

      })
      .catch(err => console.error(err)
      );
  });
  
};

// delete employee
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

          db.query(deleteEmployeeQuery, employeeID, (err, results) => {
            err ? console.error(err) : console.log(`\x1b[32mDeleted employee ${employeeName} from the database\x1b[0m\n`);
            displayMenu();
          })

        } else {

          console.log('\x1b[31mDeletion cancelled\x1b[0m');
          displayMenu();

        }

      })
      .catch(err => console.error(err)
      );
  });
  
};

// changes employee's role
const updateEmployeeRole = () => {
  // holds employee names and ids
  let employees = [];
  // query db for employee data
  db.query(getEmployeesQuery, (err, results) => {
    // store employee data
    err ? console.error(err) : employees = results;
    // extract employee names only
    const employeeNames = employees.map(employee => employee.name);
    // holds role titles and ids
    let roles;
    // query db for role data
    db.query(getRolesQuery, (err, results) => {
      // store role data
      err ? console.error(err) : roles = results;
      // extract role titles only
      const roleTitles = roles.map(role => role.title);
      // prompt user for employee to update their role
      inquirer
      .prompt(updateEmployeeRolePrompt(employeeNames, roleTitles))
      .then(({ employeeName, newRole }) => {
        // get role ID of employee's new role
        let newRoleID;
        roles.forEach((role) => {
          if(role.title === newRole) newRoleID = role.id;
        });
        // get employee's id
        let employeeID;
        employees.forEach((employee) => {
          if(employee.name === employeeName) employeeID = employee.id;
        });
        //queries db to update employee's role
        db.query(updateEmployeeRoleQuery, [newRoleID, employeeID], (err, results) => {
          err ? console.error(err) : console.log(`\x1b[32mUpdated employee ${employeeName}'s role to ${newRole}\x1b[0m\n`);
          // return to menu
          displayMenu();
        })
      })
      .catch(err => console.error(err)
      );

    });

  });

};

// changes employee's manager
const updateEmployeeManager = () => {
  // holds employee names and ids
  let employees = [];
  // query db for employee names
  db.query(getEmployeesQuery, (err, results) => {
    // store employee data
    err ? console.error(err) : employees = results;
    // extract employee names only
    const employeeNames = employees.map(employee => employee.name);
    // extract employee names again (as potential managers)
    const managerNames = employees.map(employee => employee.name);
    // Add a 'None' option to manager list
    managerNames.unshift("None");
      // prompt user for employee to update their manager, and which manager to change to
      inquirer
      .prompt(updateEmployeeManagerPrompt(employeeNames, managerNames))
      .then(({ employeeName, newManager }) => {
        // get (employee) id of the new manager
        let newManagerID = null;
        employees.forEach((manager) => {
          if(manager.name === newManager) newManagerID = manager.id;
        });
        // get id of the employee
        let employeeID;
        employees.forEach((employee) => {
          if(employee.name === employeeName) employeeID = employee.id;
        });
        // query db to change employee's manager
        db.query(updateEmployeeManagerQuery, [newManagerID, employeeID], (err, results) => {
          err ? console.error(err) : console.log(`\x1b[32mUpdated employee ${employeeName}'s manager to ${newManager}\x1b[0m\n`);
          // return to menu
          displayMenu();
        })
      })
      .catch(err => console.error(err)
      );

  });

};

// quit function, says goodbye, stops node
const quit = () => {
  console.log("\x1b[32mGoodbye!\x1b[0m");
  process.exit();
};

// init function, displays ASCII art, calls menu
const init = () => {

  console.log(figlet.textSync('Employee', {
    font: 'Big',
    horizontalLayout: 'default',
    verticalLayout: 'default',
    width: 80,
    whitespaceBreak: true
  }));

  console.log(figlet.textSync('Manager', {
    font: 'Big',
    horizontalLayout: 'default',
    verticalLayout: 'default',
    width: 80,
    whitespaceBreak: true
  }));

  console.log('\n');

  displayMenu();

};

// calls init on app start
init();