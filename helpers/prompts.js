const menuPrompt = [

    {
        name: 'menu',
        type: 'list',
        message: 'What would you like to do?',
        loop: false,
        choices: [
            'View All Employees',
            'Add Employee',
            'Update Employee Role',
            'View All Roles',
            'Add Role',
            'View All Departments',
            'Add Department',
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

}

module.exports = {
    menuPrompt,
    addDepartmentPrompt,
    addRolePrompt,
    addEmployeePrompt,
    updateEmployeeRolePrompt
}