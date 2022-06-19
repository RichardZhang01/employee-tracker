const departmentsTable = 
`SELECT * 
FROM department;`;

const rolesTable = 
`SELECT r.id, r.title, d.name AS department, r.salary
FROM role AS r
LEFT JOIN department AS d
ON r.department_id = d.id;`;

const employeesTable =
`SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(m.first_name, " ", m.last_name) AS manager
FROM employee AS e
LEFT JOIN role AS r
ON e.role_id = r.id
LEFT JOIN department AS d
ON r.department_id = d.id
LEFT JOIN employee AS m
ON e.manager_id = m.id;`;

const insertDepartment = (newDepartment) => {
    return `INSERT INTO department (name)
    VALUES ("${newDepartment}");`
};

const insertRole = (title, salary, departmentID) => {
    return `INSERT INTO role (title, salary, department_id)
    VALUES ("${title}", ${salary}, ${departmentID});`
};

module.exports = {
    departmentsTable,
    rolesTable,
    employeesTable,
    insertDepartment,
    insertRole
}