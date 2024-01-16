USE employees;

-- Insert modified sample departments
INSERT INTO department (name) VALUES
('Product Development'),
('Human Resources'),
('Public Relations'),
('Research and Development'),
('Customer Service');

-- Insert modified sample roles with updated salaries
INSERT INTO role (title, salary, department_id) VALUES
('Product Manager', 75000, 1),
('HR Specialist', 65000, 2),
('PR Coordinator', 55000, 3),
('Research Analyst', 68000, 4),
('Customer Support Agent', 48000, 5),
('Product Development Intern', 30000, 1),
('HR Intern', 25000, 2),
('PR Intern', 25000, 3),
('R&D Intern', 27000, 4),
('Customer Service Intern', 24000, 5);

-- Insert modified sample employees
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('Alice', 'Brown', 1, NULL),
('Bob', 'Wilson', 2, 1),
('Clara', 'Martin', 2, 1),
('Derek', 'Lopez', 3, NULL),
('Elena', 'Garcia', 3, 4),
('Felix', 'Jones', 5, NULL),
('Gina', 'Rodriguez', 4, 1);
