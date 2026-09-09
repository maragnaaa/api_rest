RESTful API built with Node.js for managing products and users, using Express 5, Prisma ORM, and MongoDB. The project was designed as a solid foundation for an inventory control system, with data validation on every input, centralized error handling, and a codebase organized around a Feature-Based Architecture.

## Table of Contents

- [About the project](#about-the-project)
- [Tech stack](#tech-stack)
- [Architecture](#architecture)
- [Data modeling](#data-modeling)
- [How to run the project](#how-to-run-the-project)
- [Environment variables](#environment-variables)
- [API documentation](#api-documentation)
- [Error handling and validation](#error-handling-and-validation)
- [Design decisions](#design-decisions)
- [Next steps](#next-steps)
- [Author](#author)

## About the project

This project started as a basic users CRUD and evolved throughout development into a fully layered API, with a clear separation of concerns across routes, controllers, services, and repositories. The core idea is to simulate the backend of an inventory system, where you can register products and users, query by different criteria (such as id, code, name, etc.), update and delete records — all with data validation and consistent error responses.

During development, the project went through a full refactor: it started following a more traditional MVC structure and was migrated to a feature-based organization, where each domain (products and users) carries its own route, controller, service, repository, validation schema, and DTO files. This change is reflected in the commit history and was a deliberate decision to keep the codebase easier to scale as new entities get added.

## Tech stack

| Technology | Purpose                                                            |
| ---------- | ------------------------------------------------------------------ |
| Node.js    | Server-side JavaScript runtime                                     |
| Express 5  | HTTP framework for defining routes and middlewares                 |
| Prisma ORM | Database access layer and typed client generation                  |
| MongoDB    | NoSQL database used for persistence                                |
| Zod        | Input data validation and typing (body, params)                    |
| PM2        | Process manager used to run the application                        |
| dotenv     | Loads environment variables from the `.env` file                  |

The project uses ES modules (`"type": "module"` in `package.json`), so all code is written with `import`/`export` instead of `require`.

## Architecture

The API follows a layered architecture, organized by feature inside `src/features`. Each request goes through the following flow:

```
Route → Validation middleware (Zod) → Controller → Service → Repository → Prisma → MongoDB
```

Each layer has a single responsibility:

**Routes** (`*.routes.js`) define the available HTTP endpoints and which middlewares and controllers are triggered for each one.

**Schemas** (`*.schema.js`) describe, using Zod, the expected format for request bodies and route parameters. This is the first line of defense against invalid data.

**Controllers** (`*.controller.js`) receive an already-validated request, call the corresponding service, and return the HTTP response with the appropriate status code. There's no business logic here — just input/output orchestration.

**Services** (`*.service.js`) hold the business rules: checking whether a product already exists before registering it, throwing an error when a resource isn't found, and other validations that depend on the current database state.

**Repositories** (`*.repository.js`) are the only layer that talks directly to Prisma. This isolates the rest of the application from database implementation details.

**DTOs** (`*.dto.js`) shape what the API returns, making sure only the relevant domain fields (e.g., `code`, `name`, and `price` for a product) are exposed, without leaking MongoDB's internal identifier.

This separation also makes automated testing simpler to implement down the road, since each layer can be tested in isolation.

### Folder structure

```
api_rest/
├── prisma/
│   └── schema.prisma
├── src/
│   ├── config/
│   │   ├── env.js
│   │   └── prisma.js
│   ├── features/
│   │   ├── products/
│   │   │   ├── products.controller.js
│   │   │   ├── products.dto.js
│   │   │   ├── products.repository.js
│   │   │   ├── products.routes.js
│   │   │   ├── products.schema.js
│   │   │   └── products.service.js
│   │   └── users/
│   │       ├── users.controller.js
│   │       ├── users.dto.js
│   │       ├── users.repository.js
│   │       ├── users.routes.js
│   │       ├── users.schema.js
│   │       └── users.service.js
│   ├── shared/
│   │   ├── errors/
│   │   │   └── appError.js
│   │   ├── middlewares/
│   │   │   ├── errorHandler.js
│   │   │   ├── notFound.js
│   │   │   └── validate.js
│   │   └── utils/
│   │       └── asyncHandler.js
│   ├── app.js
│   ├── index.js
│   └── routes.js
├── .env.example
├── package.json
└── prisma.config.ts
```

The `src/generated/prisma` folder doesn't show up in the structure above because it's automatically generated by the `prisma generate` command and is excluded from version control.

## Data modeling

The database is MongoDB, and Prisma handles the mapping between the models defined in `schema.prisma` and the database collections. Each document gets an `ObjectId` as its internal identifier (`_id`), but the day-to-day API queries use business identifiers instead — like the product code or the user's `id_code`.

**Product**

| Field | Type     | Rule                                          |
|-------|----------|-----------------------------------------------|
| id    | ObjectId | Automatically generated by MongoDB            |
| code  | Int      | Unique, used as the business identifier       |
| name  | String   | Unique                                        |
| price | Float    | Product price                                 |

**User**

| Field   | Type     | Rule                                          |
|---------|----------|-----------------------------------------------|
| id      | ObjectId | Automatically generated by MongoDB            |
| admin   | Boolean  | Indicates whether the user has admin privileges |
| id_code | Int      | Unique, used as the business identifier       |
| name    | String   | Unique                                        |

## How to run the project

**Prerequisites:** Node.js 18 or higher and a running MongoDB instance (local or an Atlas cluster).

Clone the repository and install the dependencies:

```bash
git clone https://github.com/maragnaaa/api_rest.git
cd api_rest
npm install
```

Create a `.env` file at the project root based on `.env.example` and fill in your own values (see the [Environment variables](#environment-variables) section).

Generate the Prisma client and sync the schema with the database:

```bash
npx prisma generate
npx prisma db push
```

Start the application:

```bash
npm start
```

The project uses PM2 to manage the process in `watch` mode, so any file changes will automatically restart the server. To stop it:

```bash
npm stop
```

By default, the API runs on the port defined in `PORT` (3100 in the development environment) and can be tested by visiting `http://localhost:3100`, which returns a status confirming the server is up and running.

## Environment variables

| Variable     | Description                                        | Example                                                      |
|--------------|----------------------------------------------------|--------------------------------------------------------------|
| PORT         | Port the server will listen on                     | 3100                                                         |
| DATABASE_URL | MongoDB connection string                          | mongodb+srv://user:password@cluster.mongodb.net/database-name |
| NODE_ENV     | Runtime environment (`development`, `production`, or `test`) | development                                        |

Variables are validated at server startup using Zod (`src/config/env.js`). If any variable is missing or in an invalid format, the application logs the error to the console and exits before the server starts — preventing the API from running in an inconsistent state.

## API documentation

All responses are in JSON. Create and update routes expect the request body in JSON as well.

### Products

Base: `/products`

| Method | Route                  | Description                        |
|--------|------------------------|------------------------------------|
| GET    | /products              | Returns all registered products    |
| GET    | /products/code/:code   | Finds a product by code            |
| GET    | /products/name/:name   | Finds a product by name            |
| POST   | /products              | Registers a new product            |
| PUT    | /products/:code        | Updates an existing product        |
| DELETE | /products/:code        | Removes a product                  |

Expected body for creation (`POST /products`):

```json
{
  "code": 1001,
  "name": "Mechanical keyboard",
  "price": 249.9
}
```

For updates (`PUT /products/:code`), all fields are optional since the update schema supports partial updates.

Response example (`200`/`201`):

```json
{
  "code": 1001,
  "name": "Mechanical keyboard",
  "price": 249.9
}
```

### Users

Base: `/users`

| Method | Route                  | Description                        |
|--------|------------------------|------------------------------------|
| GET    | /users                 | Returns all registered users       |
| GET    | /users/id/:id_code     | Finds a user by id_code            |
| GET    | /users/name/:name      | Finds a user by name               |
| POST   | /users                 | Registers a new user               |
| PUT    | /users/:id_code        | Updates an existing user           |
| DELETE | /users/:id_code        | Removes a user                     |

Expected body for creation (`POST /users`):

```json
{
  "name": "Gustavo",
  "admin": true,
  "id_code": 1
}
```

The `admin` field is optional on creation and defaults to `false` when not provided.

Response example (`200`/`201`):

```json
{
  "name": "Gustavo",
  "admin": true,
  "id_code": 1
}
```

### Status codes used

| Code | Situation                                                               |
|------|-------------------------------------------------------------------------|
| 200  | Request processed successfully                                          |
| 201  | Resource created successfully                                           |
| 204  | Resource removed successfully, no response body                         |
| 400  | Invalid input data                                                      |
| 404  | Resource or route not found                                             |
| 409  | Conflict — usually caused by trying to register an already existing resource |
| 500  | Unhandled internal error                                                |

## Error handling and validation

Input validation happens before the request even reaches the controller, through the `validate` middleware, which takes a Zod schema and the data source (`body`, `params`, or `query`). If validation fails, the response immediately comes back with status `400` and a breakdown of the invalid fields — no business logic runs at all.

Business rule errors (like trying to fetch a product that doesn't exist, or registering a user with a name that's already taken) are thrown inside the services through a custom class, `AppError`, which carries a message and an HTTP status code. These errors are caught by a central error-handling middleware (`errorHandler`), which decides what to send back to the client. In production, generic error messages are used to avoid exposing internal application details; in development, the original message is returned to make debugging easier.

To avoid repeating `try/catch` blocks in every controller, all async functions are wrapped by the `asyncHandler` utility, which automatically forwards any error to the error-handling middleware. Requests to non-existent routes fall through to the `notFound` middleware, which returns a standardized `404`.

## Design decisions

Some choices made along the way are worth explaining, since they reflect the reasoning behind the current structure:

The migration from an MVC structure to a feature-based architecture was driven by the realization that, as new entities were added to the system, single-folder `controllers`, `services`, and `routes` directories would tend to grow in a messy, hard-to-navigate way. Grouping each domain into its own folder keeps the codebase more predictable to navigate.

Using DTOs in API responses was a conscious decision to avoid exposing MongoDB's internal identifier (`_id`), since the application already has its own business identifiers (`code` for products and `id_code` for users), which make a lot more sense from the consumer's perspective.

Generating the Prisma client into a custom folder inside `src/generated/prisma`, instead of the default location in `node_modules`, keeps the client close to the rest of the source code and makes `.gitignore` adjustments more straightforward.

## Author

Developed by Gustavo Maragna.

GitHub: [github.com/maragnaaa](https://github.com/maragnaaa)
