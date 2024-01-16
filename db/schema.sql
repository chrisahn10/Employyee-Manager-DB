-- Remove the existing 'employees' database if it exists
DROP DATABASE IF EXISTS employees;

-- Create a new 'employees' database
CREATE DATABASE employees;
USE employees;

-- Create a 'department' table with an auto-incrementing ID and a unique department name
CREATE TABLE department (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) UNIQUE NOT NULL
);

-- Create a 'role' table with an auto-incrementing ID, unique title, salary, and department ID
CREATE TABLE role (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) UNIQUE NOT NULL,
    salary DECIMAL UNSIGNED NOT NULL,
    department_id INT UNSIGNED NOT NULL,
    INDEX dep_ind (department_id), -- Index for quicker searches on department_id
    CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department (id) ON DELETE CASCADE
);

-- Create an 'employee' table with an auto-incrementing ID, names, role ID, and optional manager ID
CREATE TABLE employee (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT UNSIGNED NOT NULL,
    manager_id INT UNSIGNED,
    INDEX role_ind (role_id), -- Index for quicker searches on role_id
    INDEX manager_ind (manager_id), -- Index for quicker searches on manager_id
    CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES role (id) ON DELETE CASCADE,
    CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employee (id) ON DELETE SET NULL
);
