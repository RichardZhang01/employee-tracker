const menuPrompt = [

    {
        name: 'menu',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
            'View All Employees',
            'View Employees By Manager',
            'View Employees By Department',
            'Add Employee',
            'Update Employee Role',
            'Update Employee Manager',
            'Delete Employee',
            'View All Roles',
            'Add Role',
            'Delete Role',
            'View All Departments',
            'Add Department',
            'Delete Department',
            'View Total Utilized Budget By Department',
            'Quit'         
        ],
    },

];

const addDepartmentPrompt = [

    {
        name: 'newDepartment',
        type: 'input',
        message: 'What is the name of the department?',
        validate: input => {
            if (!input) {
                console.log('\x1b[31mNo Input detected. Please enter the name of the department.\x1b[0m');
                return false;
            } else {
                return true;
            }
        } 
    }

];

const addRolePrompt = (departments) => {

    return [

        {
            name: 'roleName',
            type: 'input',
            message: 'What is the name of the role?',
            validate: input => {
                if (!input) {
                    console.log('\x1b[31mNo Input detected. Please enter the name of the role.\x1b[0m');
                    return false;
                } else {
                    return true;
                }
            } 
        },

        {
            name: 'roleSalary',
            type: 'input',
            message: "What is the salary of the role?",
            validate: input => {
                if (!input) {
                    console.log('\x1b[31mNo Input detected. Please enter a number.\x1b[0m');
                    return false;
                } else if (isNaN(input)) {
                    console.log('\x1b[31m\tPlease enter a number.\x1b[0m');
                    return false;
                } else if (input < 0) {
                    console.log('\x1b[31m\tPlease enter a non-negative number.\x1b[0m');
                    return false;
                } else {
                    return true;
                }
            }
        },

        {
            name: 'roleDepartment',
            type: 'list',
            message: 'Which department does the role belong to?',
            choices: departments
        }

    ];

};

const addEmployeePrompt = (employees, roles) => {

    return [

        {
            name: 'employeeFirstName',
            type: 'input',
            message: "What is the employee's first name?",
            validate: input => {
                if (!input) {
                    console.log('\x1b[31mNo Input detected. Please enter a name.\x1b[0m');
                    return false;
                } else {
                    return true;
                }
            } 
        },

        {
            name: 'employeeLastName',
            type: 'input',
            message: "What is the employee's last name?",
            validate: input => {
                if (!input) {
                    console.log('\x1b[31mNo Input detected. Please enter a name.\x1b[0m');
                    return false;
                } else {
                    return true;
                }
            } 
        },

        {
            name: 'employeeRole',
            type: 'list',
            message: "What is the employee's role?",
            choices: roles
        },

        {
            name: 'employeeManager',
            type: 'list',
            message: "Who is the employee's manager?",
            choices: employees
        }

    ];

};

const deleteDepartmentPrompt = (departments) => {

    return [
    
        {
            name: 'departmentName',
            type: 'list',
            message: "Which department would you like to delete?",
            choices: departments
        },

        {
            name: 'confirm',
            type: 'confirm',
            message: "Are you sure you want to delete that department?"
        },
    
    ]

};

const deleteRolePrompt = (roles) => {

    return [
    
        {
            name: 'roleName',
            type: 'list',
            message: "Which role would you like to delete?",
            choices: roles
        },

        {
            name: 'confirm',
            type: 'confirm',
            message: "Are you sure you want to delete that role?"
        },
    
    ]

};

const deleteEmployeePrompt = (employees) => {

    return [
    
        {
            name: 'employeeName',
            type: 'list',
            message: "Which employee would you like to delete?",
            choices: employees
        },

        {
            name: 'confirm',
            type: 'confirm',
            message: "Are you sure you want to delete that employee?"
        },
    
    ]

};

const updateEmployeeRolePrompt = (employees, roles) => {

    return [

        {
            name: 'employeeName',
            type: 'list',
            message: "Which employee's role do you want to update?",
            choices: employees
        },

        {
            name: 'newRole',
            type: 'list',
            message: "Which role do you want to assign the selected employee?",
            choices: roles
        }

    ];

};

const updateEmployeeManagerPrompt = (employees, managers) => {

    return [

        {
            name: 'employeeName',
            type: 'list',
            message: "Which employee's manager do you want to update?",
            choices: employees
        },

        {
            name: 'newManager',
            type: 'list',
            message: "Which manager do you want to assign the selected employee?",
            choices: managers
        }

    ];

};

const viewByManagerPrompt = (managers) => {

    return [

        {
            name: 'managerName',
            type: 'list',
            message: "Which manager's employees would you like to view?",
            choices: managers
        }

    ];

};

const viewByDepartmentPrompt = (departments) => {

    return [

        {
            name: 'departmentName',
            type: 'list',
            message: "Which department's employees would you like to view?",
            choices: departments
        }

    ];

}

const viewDepartmentBudgetPrompt = (departments) => {

    return [

        {
            name: 'departmentName',
            type: 'list',
            message: "Which department's total utilized budget would you like to view?",
            choices: departments
        }

    ];

}

module.exports = {
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
}