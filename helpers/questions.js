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

]

module.exports = {
    menuPrompt
}