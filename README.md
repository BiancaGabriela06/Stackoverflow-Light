# Stackoverflow-Light

This is a simplified version of StackOverflow, designed as part of an assignment. It allows users to post questions, provide answers, and vote on questions.

## Deployment on Google Cloud Platform (GCP)

To deploy this application on GCP, the following services are recommended:

- **Google Cloud Kubernetes Engine**: Manages the Docker containers within a Kubernetes cluster.
- **Cloud SQL**: Manages the MySQL database for the application.

## Docker Setup

The `docker-compose.yml` file is configured to set up the necessary services:

- **app-service**: the main service with port=8080
- **auth-service**: the main scope is to authenticate the user
- **data-service**: send data to the database
- **database**

## How to Run the Project

1. **Install Docker**: Ensure Docker is installed and running on your machine.
   
   If Docker is not installed, you can download and install it from the official Docker website: [Docker Download](https://www.docker.com/get-started)

2. **Clone the Repository**: Clone the repository to your local machine using the following command:
   ```bash
   git clone https://github.com/BiancaGabriela06/Stackoverflow-Light

3. **Navigate to the Project Directory**

4. **Build and Run the Docker Containers**:  Run the following command to build and start all the services (app, auth, data, and database) defined in the docker-compose.yml file:
   docker-compose up --build

5. **Access the Application**: Once the containers are running, you can access the services on the following ports:

- App Service: http://localhost:8080
- Auth Service: http://localhost:8088
- Data Service: http://localhost:8000

## API Endpoints

### Questions

- **POST** `/questions/add`
  - **Description**: Adds a new question to the database.
  - **Request Body**:
    ```json
    {
      "user_id": 1,
      "text": "How to implement JWT authentication in Node.js?"
    }
    ```
  - **Response**:
    - `201 Created` if the question is successfully added.
    - `400 Bad Request` if there is an issue with the request.

- **GET** `/questions/{id}`
  - **Description**: Fetches a specific question by its ID.
  - **Response**:
    ```json
    {
      "id": 1,
      "user_id": 1,
      "text": "How to implement JWT authentication in Node.js?",
      "created_at": "2024-11-07T00:00:00Z"
    }
    ```
  - **Response Codes**:
    - `200 OK` if the question is found.
    - `404 Not Found` if the question does not exist.

- **DELETE** `/questions/delete/{id}`
  - **Description**: Deletes a question by its ID.
  - **Response**:
    - `200 OK` if the question is successfully deleted.
    - `404 Not Found` if the question doesn't exist.

### Authentication

- **POST** `/auth/login`
  - **Description**: Logs a user in by providing username and password.
  - **Request Body**:
    ```json
    {
      "username": "user123",
      "password": "password123"
    }
    ```
  - **Response**:
    - `200 OK` with a JWT token if the credentials are correct.
    - `401 Unauthorized` if the login fails.

- **POST** `/auth/sign-up`
  - **Description**: Registers a new user.
  - **Request Body**:
    ```json
    {
      "username": "newuser",
      "password": "password123A!",
      "repeatPassword": "password123A!", 
      "email": "newuser@example.com"
    }
    ```
  - **Response**:
    - `201 Created` if the user is successfully registered.
    - `400 Bad Request` if the provided data is invalid.

### Answers

- **POST** `/answers/{id}`
  - **Description**: Adds an answer to a question.
  - **Request Body**:
    ```json
    {
      "question_id": 1,
      "user_id": 2,
      "text": "You can implement JWT authentication using libraries like jsonwebtoken in Node.js."
    }
    ```
  - **Response**:
    - `201 Created` if the answer is successfully added.
    - `400 Bad Request` if the data is invalid.

### Votes

- **POST** `/votes/{id}`
  - **Description**: Adds a vote to a question.
  - **Request Body**:
    ```json
    {
      "question_id": 1,
      "user_id": 2,
      "vote_type": 0  // can be 1 for 'upvote' or 0 for 'downvote'
    }
    ```
  - **Response**:
    - `201 Created` if the vote is successfully added.
    - `400 Bad Request` if the data is invalid.


## Running Unit Tests in Data Service
To run unit tests in the data-service, use the following command: 

*cd data-service*
*npm test*

## JWT Token
For obtaining JWT_SECRET run in terminal command
 openssl rand -base64 64

Copy that and put it in app-service/env


![image](https://github.com/user-attachments/assets/2b965b32-3a1b-4090-82bf-0672a2ff7ffd)

