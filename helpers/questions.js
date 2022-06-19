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
            loop: false,
            choices: departments
        }

    ];

};

module.exports = {
    menuPrompt,
    addDepartmentPrompt,
    addRolePrompt
}