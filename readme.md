# NodeJS

## About The Project

This project (branch master) is a small REST web API

## Built With

* [PostgreSQL](https://www.postgresql.org/)
* [Sequelize](https://sequelize.org/)
* [Express](https://expressjs.com/)

## Getting Started

### Prerequisites

* Node.js 14.16.0 and higher

### Installation

1. Clone the repo

```
git clone https://github.com/Mariya-Z/node-mentoring.git
```

2. Install NPM packages

```
npm install
```

3. Set environment variables

* DATABASE_URL
* TOKEN_SECRET
* PORT


## Start server

```
npm run start
```

## Tests

```
npm run test
```

### Create a database

```
npm run db:create
```

### Apply Sequelize migrations

```
npm run db:migrate
```

## Usage

| HTTP Verb   | `/authenticate`   | `\users`             | `\users\{id}`  | `\groups`           | `\groups\{id}` | `\groups\{id}\users` |
| ----------- | ----------------- | -------------------- | -------------- | ------------------- | -------------- | -------------------- |
| POST        | Authenticate user | Create a new user    | -              | Create a new group  | -              | Add users to group   |
| GET         | -                 | Show list of users   | Show user      | Show list of groups | Show group     | -                    |
| PUT         | -                 | -                    | Update user    | -                   | Update group   | -                    |
| DELETE      | -                 | -                    | Delete user    | -                   | Delete group   | -                    |

## Contracts

### Authenticate

```
{
    login: string
    password: string
}
```

### Create a user

```
{
    login: string
    password: string
    age: number
}
```

### Update a user

```
{
    login: string
    password: string
    age: number
}
```

### Add users to a group

```
{
    userIds: uuid[]
}
```

### Create a group

```
{
    name: string
    permissions: string[]
}
```

### Update a group

```
{
    name: string
    permissions: string[]
}
```

---

## First module

1. Open a branch first_module

2. Install Dependencies (run command in corresponding folder)

> npm install

### Task 1.1

A program which reads a string from the standard input stdin, reverses it and then writes it to the standard output stdout.
Run `npm run task1`

### Task 1.2

A program which reads the content of csv file from `./csv` directory and writes the csv file content to a new txt file.
Run `npm run task2`

### Task 1.3

Same with task 1.2 but with babel and ES6 modules.
Run `npm run task3`