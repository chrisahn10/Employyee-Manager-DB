// Importing necessary modules
const inquirer = require("inquirer");
const db = require("./db");

// Start the application
init();

// Initializes the application by loading the main prompts
function init() {
    loadMainPrompts();
}

// Function to display the main menu prompts to the user
function loadMainPrompts() {
    inquirer.prompt([
        {
            type: "list",
            name: "choice",
            message: "How can we help you?",
            choices: [
                { name: "View All Employees", value: "VIEW_EMPLOYEES" },
                { name: "View Employees By Department", value: "VIEW_EMPLOYEES_BY_DEPARTMENT" },
                { name: "View Employees By Manager", value: "VIEW_EMPLOYEES_BY_MANAGER" },
                { name: "Add Employee", value: "ADD_EMPLOYEE" },
                { name: "Remove Employee", value: "REMOVE_EMPLOYEE" },
                { name: "Update Employee Role", value: "UPDATE_EMPLOYEE_ROLE" },
                { name: "Update Employee Manager", value: "UPDATE_EMPLOYEE_MANAGER" },
                { name: "View All Roles", value: "VIEW_ROLES" },
                { name: "Add Role", value: "ADD_ROLE" },
                { name: "Remove Role", value: "REMOVE_ROLE" },
                { name: "View All Departments", value: "VIEW_DEPARTMENTS" },
                { name: "Add Department", value: "ADD_DEPARTMENT" },
                { name: "Remove Department", value: "REMOVE_DEPARTMENT" },
                { name: "View Department Budgets", value: "VIEW_DEPARTMENT_BUDGETS" },
                { name: "Quit", value: "QUIT" }
            ]
        }
    ]).then(answer => {
        let choice = answer.choice;
        // Using switch/case, we can determine which function will be called based on what the user chooses.
        // Determine the action based on user's choice
        switch (answer.choice) {
            case "VIEW_EMPLOYEES":
                viewEmployees();
                break;
            case "VIEW_EMPLOYEES_BY_DEPARTMENT":
                viewEmployeesByDepartment();
                break;
            case "VIEW_EMPLOYEES_BY_MANAGER":
                viewEmployeesByManager();
                break;
            case "ADD_EMPLOYEE":
                addEmployee();
                break;
            case "REMOVE_EMPLOYEE":
                removeEmployee();
                break;
            case "UPDATE_EMPLOYEE_ROLE":
                updateEmployeeRole();
                break;
            case "UPDATE_EMPLOYEE_MANAGER":
                updateEmployeeManager();
                break;
            case "VIEW_DEPARTMENTS":
                viewDepartments();
                break;
            case "ADD_DEPARTMENT":
                addDepartment();
                break;
            case "REMOVE_DEPARTMENT":
                removeDepartment();
                break;
            case "VIEW_ROLES":
                viewRoles();
                break;
            case "ADD_ROLE":
                addRole();
                break;
            case "REMOVE_ROLE":
                removeRole();
                break;
            case "VIEW_DEPARTMENT_BUDGETS":
                viewDepartmentBudgets();
                break;
            case "QUIT":
                quit();
                break;
            }
        });
    }

// These functions use the 'db' module's helper methods to interact with the database.
// The 'map' method is utilized to construct arrays of objects for inquirer prompts.

// Function to display all employees
function viewEmployees() {
    db.findAllEmployees()
        .then(([employees]) => {
            console.log("\n");
            console.table(employees);
        })
        .then(loadMainPrompts);
}

// Function to display employees by department
function viewEmployeesByDepartment() {
    db.findAllDepartments()
        .then(([departments]) => {
            const departmentOptions = departments.map(department => ({
                name: department.name,
                value: department.id
            }));

            return inquirer.prompt([
                {
                    type: "list",
                    name: "departmentId",
                    message: "Select a department to view its employees:",
                    choices: departmentOptions
                }
            ]);
        })
        .then(answer => db.findAllEmployeesByDepartment(answer.departmentId))
        .then(([employees]) => {
            console.log("\n");
            console.table(employees);
        })
        .then(loadMainPrompts);
}

// Function to display employees managed by a specific manager
function viewEmployeesByManager() {
    db.findAllEmployees()
        .then(([employees]) => {
            const managerOptions = employees.map(({ id, first_name, last_name }) => ({
                name: `${first_name} ${last_name}`,
                value: id
            }));

            return inquirer.prompt([
                {
                    type: "list",
                    name: "managerId",
                    message: "Choose a manager to see their direct reports:",
                    choices: managerOptions
                }
            ]);
        })
        .then(answer => db.findAllEmployeesByManager(answer.managerId))
        .then(([directReports]) => {
            console.log("\n");

            if (directReports.length === 0) {
                console.log("This manager does not have any direct reports.");
            } else {
                console.table(directReports);
            }
        })
        .then(loadMainPrompts);
}

// Function to add a new employee to the database
function addEmployee() {
    inquirer.prompt([
        {
            name: "first_name",
            message: "Enter the employee's first name:"
        },
        {
            name: "last_name",
            message: "Enter the employee's last name:"
        }
    ])
    .then(({ first_name, last_name }) => {
        return db.findAllRoles()
            .then(([roles]) => {
                const roleChoices = roles.map(({ id, title }) => ({
                    name: title,
                    value: id
                }));

                return inquirer.prompt({
                    type: "list",
                    name: "roleId",
                    message: "Select the employee's role:",
                    choices: roleChoices
                })
                .then(({ roleId }) => ({ first_name, last_name, roleId }));
            });
    })
    .then(({ first_name, last_name, roleId }) => {
        return db.findAllEmployees()
            .then(([employees]) => {
                const managerChoices = employees.map(({ id, first_name, last_name }) => ({
                    name: `${first_name} ${last_name}`,
                    value: id
                }));
                managerChoices.unshift({ name: "None", value: null });

                return inquirer.prompt({
                    type: "list",
                    name: "managerId",
                    message: "Select the employee's manager:",
                    choices: managerChoices
                })
                .then(({ managerId }) => ({
                    first_name, last_name, roleId, managerId
                }));
            });
    })
    .then(({ first_name, last_name, roleId, managerId }) => {
        const newEmployee = {
            first_name,
            last_name,
            role_id: roleId,
            manager_id: managerId
        };

        db.createEmployee(newEmployee)
        .then(() => console.log(`Added ${first_name} ${last_name} to the database`))
        .then(loadMainPrompts);
    });
}


// Function to remove an employee from the database
function removeEmployee() {
    db.findAllEmployees()
        .then(([employees]) => {
            const employeeOptions = employees.map(({ id, first_name, last_name }) => ({
                name: `${first_name} ${last_name}`,
                value: id
            }));

            return inquirer.prompt([
                {
                    type: "list",
                    name: "employeeId",
                    message: "Select the employee to remove:",
                    choices: employeeOptions
                }
            ]);
        })
        .then(({ employeeId }) => {
            return db.removeEmployee(employeeId)
                .then(() => console.log("Removed employee from the database"));
        })
        .then(loadMainPrompts);
}


// Function to update an employee's role in the database
function updateEmployeeRole() {
    db.findAllEmployees()
        .then(([employees]) => {
            const employeeOptions = employees.map(({ id, first_name, last_name }) => ({
                name: `${first_name} ${last_name}`,
                value: id
            }));

            return inquirer.prompt([
                {
                    type: "list",
                    name: "employeeId",
                    message: "Select the employee whose role you want to update:",
                    choices: employeeOptions
                }
            ]);
        })
        .then(({ employeeId }) => {
            return db.findAllRoles()
                .then(([roles]) => {
                    const roleOptions = roles.map(({ id, title }) => ({
                        name: title,
                        value: id
                    }));

                    return inquirer.prompt([
                        {
                            type: "list",
                            name: "roleId",
                            message: "Select the new role for the employee:",
                            choices: roleOptions
                        }
                    ])
                    .then(({ roleId }) => ({ employeeId, roleId }));
                });
        })
        .then(({ employeeId, roleId }) => {
            return db.updateEmployeeRole(employeeId, roleId)
                .then(() => console.log("Updated employee's role"));
        })
        .then(loadMainPrompts);
}

// Function to update the manager of an employee in the database
function updateEmployeeManager() {
    db.findAllEmployees()
        .then(([employees]) => {
            const employeeOptions = employees.map(({ id, first_name, last_name }) => ({
                name: `${first_name} ${last_name}`,
                value: id
            }));

            return inquirer.prompt([
                {
                    type: "list",
                    name: "employeeId",
                    message: "Select the employee whose manager you want to update:",
                    choices: employeeOptions
                }
            ]);
        })
        .then(({ employeeId }) => {
            return db.findAllPossibleManagers(employeeId)
                .then(([managers]) => {
                    const managerOptions = managers.map(({ id, first_name, last_name }) => ({
                        name: `${first_name} ${last_name}`,
                        value: id
                    }));

                    return inquirer.prompt([
                        {
                            type: "list",
                            name: "managerId",
                            message: "Select the new manager for the employee:",
                            choices: managerOptions
                        }
                    ])
                    .then(({ managerId }) => ({ employeeId, managerId }));
                });
        })
        .then(({ employeeId, managerId }) => {
            return db.updateEmployeeManager(employeeId, managerId)
                .then(() => console.log("Updated employee's manager"));
        })
        .then(loadMainPrompts);
}


// View all roles in the database.
function viewRoles() {
    db.findAllRoles()
        .then(([rows]) => {
            let roles = rows;
            console.log("\n");
            console.table(roles);
        })
        .then(() => loadMainPrompts());
}

// Function to add a new role to the database
function addRole() {
    db.findAllDepartments()
        .then(([departments]) => {
            const departmentOptions = departments.map(({ id, name }) => ({
                name: name,
                value: id
            }));

            return inquirer.prompt([
                {
                    name: "title",
                    message: "Enter the name of the new role:"
                },
                {
                    name: "salary",
                    message: "Enter the salary for this role:"
                },
                {
                    type: "list",
                    name: "department_id",
                    message: "Select the department for this role:",
                    choices: departmentOptions
                }
            ]);
        })
        .then(newRole => {
            return db.createRole(newRole)
                .then(() => console.log(`Added ${newRole.title} role to the database`));
        })
        .then(loadMainPrompts);
}


// Function to remove a role from the database
function removeRole() {
    db.findAllRoles()
        .then(([roles]) => {
            const roleOptions = roles.map(({ id, title }) => ({
                name: title,
                value: id
            }));

            return inquirer.prompt([
                {
                    type: "list",
                    name: "roleId",
                    message: "Select the role you want to remove:",
                    choices: roleOptions
                }
            ]);
        })
        .then(({ roleId }) => {
            return db.removeRole(roleId)
                .then(() => console.log("Removed role from the database"));
        })
        .then(loadMainPrompts);
}

// View all departments in the database.
function viewDepartments() {
    db.findAllDepartments()
        .then(([rows]) => {
            let departments = rows;
            console.log("\n");
            console.table(departments);
        })
        .then(() => loadMainPrompts());
}

// Function to add a new department to the database
function addDepartment() {
    inquirer.prompt({
        name: "name",
        message: "Enter the name of the new department:"
    })
    .then(({ name }) => {
        return db.createDepartment(name)
            .then(() => console.log(`Added department '${name}' to the database`));
    })
    .then(loadMainPrompts);
}
// Function to remove a department from the database
function removeDepartment() {
    db.findAllDepartments()
        .then(([departments]) => {
            const departmentOptions = departments.map(({ id, name }) => ({
                name: name,
                value: id
            }));

            return inquirer.prompt({
                type: "list",
                name: "departmentId",
                message: "Select the department you want to remove:",
                choices: departmentOptions
            });
        })
        .then(({ departmentId }) => {
            return db.removeDepartment(departmentId)
                .then(() => console.log("Removed department from the database"));
        })
        .then(loadMainPrompts);
}

// Function to view budgets of departments
function viewDepartmentBudgets() {
    db.viewDepartmentBudgets()
        .then(([departments]) => {
            console.log("\n");
            console.table(departments);
        })
        .then(loadMainPrompts);
}

// Function to quit the application
function quit() {
    console.log("Thanks for stopping by. Have a great day!");
    process.exit();
}
