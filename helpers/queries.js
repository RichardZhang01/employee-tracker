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

const employeesByManagerQuery = 
`SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(m.first_name, " ", m.last_name) AS manager
FROM employee AS e
LEFT JOIN role AS r
ON e.role_id = r.id
LEFT JOIN department AS d
ON r.department_id = d.id
INNER JOIN employee AS m
ON e.manager_id = m.id
WHERE CONCAT(m.first_name, " ", m.last_name) = ?
ORDER BY e.first_name, e.last_name;`

const employeesByDepartmentQuery = 
`SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(m.first_name, " ", m.last_name) AS manager
FROM employee AS e
LEFT JOIN role AS r
ON e.role_id = r.id
INNER JOIN department AS d
ON r.department_id = d.id
LEFT JOIN employee AS m
ON e.manager_id = m.id
WHERE d.name = ?
ORDER BY e.first_name, e.last_name;`

const budgetByDepartmentQuery = 
`SELECT d.name AS department, SUM(r.salary) AS total_utilized_budget 
FROM employee AS e
INNER JOIN role AS r
ON e.role_id = r.id
LEFT JOIN department AS d
ON r.department_id = d.id
WHERE d.name = ?
GROUP BY department
ORDER BY department;`

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

const insertDepartmentQuery = 
`INSERT INTO department (name)
VALUES (?);`

const insertRoleQuery = 
`INSERT INTO role (title, salary, department_id)
VALUES (?, ?, ?);`


const insertEmployeeQuery = 
`INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES (?, ?, ?, ?);`

const deleteDepartmentQuery = 
`DELETE FROM department
WHERE id = ?;`

const deleteRoleQuery = 
`DELETE FROM role
WHERE id = ?;`

const deleteEmployeeQuery = 
`DELETE FROM employee
WHERE id = ?;`

const updateEmployeeRoleQuery = 
`UPDATE employee
SET role_id = ?
WHERE id = ?;`   

const updateEmployeeManagerQuery = 
`UPDATE employee
SET manager_id = ?
WHERE id = ?;`   

module.exports = {
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
}