const connection = require("./connection");

class DB {
    constructor(connection) {
        this.connection = connection;
    }

    findAllEmployees() {
        return this.connection.promise().query(`
            SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, 
                   CONCAT(m.first_name, ' ', m.last_name) AS manager 
            FROM employee e
            LEFT JOIN role r ON e.role_id = r.id
            LEFT JOIN department d ON r.department_id = d.id
            LEFT JOIN employee m ON m.id = e.manager_id;
        `);
    }

    findAllPossibleManagers(employeeId) {
        return this.connection.promise().query(
            "SELECT id, first_name, last_name FROM employee WHERE id != ?",
            employeeId
        );
    }

    createEmployee(employee) {
        return this.connection.promise().query("INSERT INTO employee SET ?", employee);
    }

    removeEmployee(employeeId) {
        return this.connection.promise().query("DELETE FROM employee WHERE id = ?", employeeId);
    }

    updateEmployeeRole(employeeId, roleId) {
        return this.connection.promise().query(
            "UPDATE employee SET role_id = ? WHERE id = ?", [roleId, employeeId]
        );
    }

    updateEmployeeManager(employeeId, managerId) {
        return this.connection.promise().query(
            "UPDATE employee SET manager_id = ? WHERE id = ?", [managerId, employeeId]
        );
    }

    findAllRoles() {
        return this.connection.promise().query(`
            SELECT r.id, r.title, d.name AS department, r.salary 
            FROM role r
            LEFT JOIN department d ON r.department_id = d.id;
        `);
    }

    createRole(role) {
        return this.connection.promise().query("INSERT INTO role SET ?", role);
    }

    removeRole(roleId) {
        return this.connection.promise().query("DELETE FROM role WHERE id = ?", roleId);
    }

    findAllDepartments() {
        return this.connection.promise().query("SELECT id, name FROM department");
    }

    viewDepartmentBudgets() {
        return this.connection.promise().query(`
            SELECT d.id, d.name, SUM(r.salary) AS utilized_budget 
            FROM employee e
            LEFT JOIN role r ON e.role_id = r.id
            LEFT JOIN department d ON r.department_id = d.id 
            GROUP BY d.id, d.name;
        `);
    }

    createDepartment(department) {
        return this.connection.promise().query("INSERT INTO department SET ?", department);
    }

    removeDepartment(departmentId) {
        return this.connection.promise().query("DELETE FROM department WHERE id = ?", departmentId);
    }

    findAllEmployeesByDepartment(departmentId) {
        return this.connection.promise().query(`
            SELECT e.id, e.first_name, e.last_name, r.title 
            FROM employee e
            LEFT JOIN role r ON e.role_id = r.id
            LEFT JOIN department d ON r.department_id = d.id 
            WHERE d.id = ?;
        `, departmentId);
    }

    findAllEmployeesByManager(managerId) {
        return this.connection.promise().query(`
            SELECT e.id, e.first_name, e.last_name, d.name AS department, r.title 
            FROM employee e
            LEFT JOIN role r ON r.id = e.role_id
            LEFT JOIN department d ON d.id = r.department_id 
            WHERE e.manager_id = ?;
        `, managerId);
    }
}

module.exports = new DB(connection);
