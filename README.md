# NestJS Final Test Project

This project is a NestJS application with end-to-end tests using Postgres. This guide will help you set up the project, run the application, and execute tests.

### Authors
Author : Nolan LeBoucher, Chahine Benlahcen tlemcani. 

## Prerequisites

- [Node.js](https://nodejs.org/) (version 12.x or higher)
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/Edofo/nestjs-final-test.git
    cd nestjs-final-test
    ```

2. Install dependencies:

    ```bash
    npm ci
    ```

## Running the Application

### Using Postgres


1. Start the application with postgres:

    ```bash
    npm run start:postgres
    ```

## Running End-to-End Tests

### Using Postgres

1. Run the end-to-end tests with postgres:

    ```bash
    npm run test:e2e:postgres
    ```

## Environment Variables

Make sure to configure your `.env` file with the appropriate settings for your database and other environment variables.

---
