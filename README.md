# Projecto - State Management Website

Welcome to Projecto, your go-to platform for efficient project management and task tracking.
<div align="center" >
    <img src="https://github.com/AbdelrhmanReda17/CODSOFT/assets/90706154/37a2c8d0-f09c-447e-99c0-da3e8222d54e">
</div>

## Overview
Projecto is a dynamic and user-friendly web application designed to help you manage your projects effectively. Developed with a focus on simplicity and functionality, Projecto offers features that enable you to create, edit, and track your projects and tasks effortlessly. Our platform ensures that you stay organized, meet deadlines, and achieve your project goals.

- Front-end: React
- Back-end: Node.js
- Database: MongoDB
- Authentication: JWT (JSON Web Tokens)
- State Management: Redux
- Form Validation: Yup / Formik

## Features

- **User-Friendly Interface**: Experience a smooth and intuitive user interface built with React, providing easy navigation and an appealing design.

- **Project Management**: Create, edit, and delete projects with the ability to set deadlines for each project.

- **Task Tracking**: For each project, add tasks with their respective deadlines. Mark tasks as completed or edit them as needed.

- **Authentication System**: Register and log in to your account to access personalized features like saved projects and tasks.

- **State Management**: Efficiently manage the application's state with Redux, ensuring a responsive and seamless user experience.

# Installation

To run this project locally, follow these simple steps:

1. Clone the Repository:
  ```bash
  git clone https://github.com/AbdelrhmanReda17/CODSOFT/tree/Project-Management-Tool
  cd Project-Management-Tool
  ```
2. Install Dependencies:
   - For the server:
    ```
    cd server
    npm install
    ```
   - For the client:
    ```
    cd client
    npm install
    ```
3. Server Configuration:
  Navigate to the server directory and create a .env file.
  Update the environment variables in the .env file, including MongoDB connection details and JWT secret.
4. Running the Application:
   - In the server directory, run the Express server:
    ```
    npm start
    ```
   - In the client directory, run the React development server:
    ```
    npm start
    ```
5. Access the website at http://localhost:3000.

## License
This project is open-source and is licensed under the MIT License.
