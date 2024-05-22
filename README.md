# NestJS Final Test Project

This project is a NestJS application with end-to-end tests using Postgres. This guide will help you set up the project, run the application, and execute tests.

### Authors
Author : Nolan Leboucher, Chahine Benlahcen tlemcani. 

## Prerequisites

- [Node.js](https://nodejs.org/) (version 1.18.x or higher)
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/Edofo/nestjs-final-test.git
cd nestjs-final-test
```

2. Install dependencies and setup the database

```bash
npm run setup
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

## Folder structure

- docker/         # Contains the Docker Compose configuration
- prisma/
    - migrations/         # Contains all database migrations
    - schema.prisma       # Defines the database schema
- src/
    - main.ts             # Entry point of the application
    - helpers/            # Utility functions and helpers
    - infrastructure/     # Core infrastructure components and configurations
    - modules/            # Application modules, each encapsulating specific functionality
- test/             # Contains all tests end-to-end 

---
