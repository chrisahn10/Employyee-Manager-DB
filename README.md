# Employee Management System

## Description

This Employee Management System is a Node.js command-line application that enables users to manage employees, roles, departments, and managers within a company. Utilizing MySQL for data storage and `inquirer` for user interaction, this system offers a comprehensive solution for employee management.

## Installation

### Prerequisites

- Node.js
- MySQL

### Steps

1. Clone the repository to your local machine.
2. Run `npm install` to install all dependencies.
3. Set up the MySQL database using the provided schema and seed SQL scripts.
4. Create a `.env` file in the root directory with your MySQL credentials:

    ```
    DB_HOST=your_host
    DB_USER=your_username
    DB_PASSWORD=your_password
    DB_NAME=employees
    ```

5. Start the application using `node app.js` (assuming `app.js` is your main application file).

## Usage

Upon starting the application, you will be presented with a menu to:

- View all employees, roles, departments, and budgets.
- Add employees, roles, departments.
- Update employee roles and managers.
- Remove employees, roles, departments.

Select an option and follow the prompts to interact with the database.

## Features

- Interactive command-line interface.
- Comprehensive employee management.
- Department and role management.
- Budget viewing for departments.
- Update managers for employees.

## Database Structure

The database is structured with three main tables:

1. `department`: Holds department data.
2. `role`: Stores roles and associated department data.
3. `employee`: Manages employee data, roles, and managers.

## Contributing

Contributions to this project are welcome. Please adhere to the typical fork, branch, and pull request workflow.

## License

MIT License

Copyright (c) 

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
