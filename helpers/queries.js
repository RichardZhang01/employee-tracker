const departmentsTableQuery = 
`SELECT * 
FROM department
ORDER BY name;`;

const rolesTableQuery = 
`SELECT r.id, r.title, d.name AS department, r.salary
FROM role AS r
LEFT JOIN department AS d
ON r.department_id = d.id
ORDER BY d.name, r.title;`;

const employeesTableQuery =
`SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(m.first_name, " ", m.last_name) AS manager
FROM employee AS e
LEFT JOIN role AS r
ON e.role_id = r.id
LEFT JOIN department AS d
ON r.department_id = d.id
LEFT JOIN employee AS m
ON e.manager_id = m.id
ORDER BY e.first_name, e.last_name;`;

const employeesByManagerQuery = (managerID) => {
    return `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(m.first_name, " ", m.last_name) AS manager
    FROM employee AS e
    LEFT JOIN role AS r
    ON e.role_id = r.id
    LEFT JOIN department AS d
    ON r.department_id = d.id
    INNER JOIN employee AS m
    ON e.manager_id = m.id
    WHERE e.manager_id = ${managerID}
    ORDER BY e.first_name, e.last_name;`
}

const getEmployeesQuery =
`SELECT CONCAT(first_name, " ", last_name) AS name, id
FROM employee
ORDER BY name;`;

const getRolesQuery = 
`SELECT id, title
FROM role
ORDER BY title;`;

const getManagersQuery =
`SELECT m.id, CONCAT(m.first_name, " ", m.last_name) AS name
FROM employee AS e
INNER JOIN employee AS m
ON e.manager_id = m.id
GROUP BY name;`;

const insertDepartmentQuery = (newDepartment) => {
    return `INSERT INTO department (name)
    VALUES ("${newDepartment}");`
};

const insertRoleQuery = (title, salary, departmentID) => {
    return `INSERT INTO role (title, salary, department_id)
    VALUES ("${title}", ${salary}, ${departmentID});`
};

const insertEmployeeQuery = (firstName, lastName, roleID, managerID) => {
    return `INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES ("${firstName}", "${lastName}", ${roleID}, ${managerID});`
};

const updateEmployeeRoleQuery = (employeeID, newRoleID) => {
    return `UPDATE employee
    SET role_id = ${newRoleID}
    WHERE id = ${employeeID};`   
};

module.exports = {
    departmentsTableQuery,
    rolesTableQuery,
    employeesTableQuery,
    employeesByManagerQuery,
    getEmployeesQuery,
    getRolesQuery,
    getManagersQuery,
    insertDepartmentQuery,
    insertRoleQuery,
    insertEmployeeQuery,
    updateEmployeeRoleQuery
}