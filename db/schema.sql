DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE IF NOT EXISTS employees_db;
USE employees_db;

DROP TABLE IF EXISTS department,
                     role,
                     employee;

CREATE TABLE department (
    id              INT             NOT NULL    AUTO_INCREMENT,
    name            VARCHAR(30)     NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id              INT             NOT NULL    AUTO_INCREMENT,
    title           VARCHAR(30)     NOT NULL,
    salary          DECIMAL(30, 2)         NOT NULL,
    department_id   INT             NOT NULL,
    -- connect role table's department_id to department table's id
    FOREIGN KEY (department_id) 
        REFERENCES department(id) 
        -- if department is deleted, delete all roles under that department
        ON DELETE CASCADE,
    PRIMARY KEY (id)
);

CREATE TABLE employee (
    id              INT             NOT NULL    AUTO_INCREMENT,
    first_name      VARCHAR(30)     NOT NULL,
    last_name       VARCHAR(30)     NOT NULL,
    role_id         INT,
    manager_id      INT,
    -- connect employee table's role_id to role table's id
    FOREIGN KEY (role_id) 
        REFERENCES role(id)
        -- if role is deleted, sets employee's role_id to null
        ON DELETE SET NULL,
    -- connect employee table's manager_id to employee table's id (one employee to another)
    FOREIGN KEY (manager_id) 
        REFERENCES employee(id)
        -- if an employee that is set as the manager of another employee(staff member) is deleted, 
        -- sets the staff member's manager_id to null
        ON DELETE SET NULL 
        -- updates staff member's manager_id if manager's id changes. this cannot occur in the app.
        -- only works when an employee's id is changed manually
        ON UPDATE CASCADE,
    PRIMARY KEY (id)
);  