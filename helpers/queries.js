const departmentsTable = 
`SELECT * 
FROM department
ORDER BY name;`;

const rolesTable = 
`SELECT r.id, r.title, d.name AS department, r.salary
FROM role AS r
LEFT JOIN department AS d
ON r.department_id = d.id
ORDER BY d.name, r.title;`;

const employeesTable =
`SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(m.first_name, " ", m.last_name) AS manager
FROM employee AS e
LEFT JOIN role AS r
ON e.role_id = r.id
LEFT JOIN department AS d
ON r.department_id = d.id
LEFT JOIN employee AS m
ON e.manager_id = m.id
ORDER BY d.name, e.first_name, e.last_name;`;

const getEmployees =
`SELECT CONCAT(first_name, " ", last_name) AS name, id
FROM employee
ORDER BY name;`;

const getRoles = 
`SELECT id, title
FROM role
ORDER BY title;`;

const insertDepartment = (newDepartment) => {
    return `INSERT INTO department (name)
    VALUES ("${newDepartment}");`
};

const insertRole = (title, salary, departmentID) => {
    return `INSERT INTO role (title, salary, department_id)
    VALUES ("${title}", ${salary}, ${departmentID});`
};

const insertEmployee = (firstName, lastName, roleID, managerID) => {
    return `INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES ("${firstName}", "${lastName}", ${roleID}, ${managerID});`
};

module.exports = {
    departmentsTable,
    rolesTable,
    employeesTable,
    getEmployees,
    getRoles,
    insertDepartment,
    insertRole,
    insertEmployee
}