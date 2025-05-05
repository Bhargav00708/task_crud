# Task Management Project

This project focuses on performing CRUD operations for tasks.

## Setup Instructions
To run this project, add the following environment variable:
- `MONGODB_URL`

## API Endpoints
The project provides the following task-related endpoints:

- **GET** `/task` – Retrieve a list of all tasks.
- **POST** `/task` – Create a new task.
- **GET** `/task/:id` – Retrieve details of a specific task.
- **PUT** `/task/:id` – Update an existing task.
- **DELETE** `/task/:id` – Remove a task.

## User and Admin Creation
To create an admin or user, use the `/token/create` API endpoint.