### Description

Backend service to manage members of a company. They can be employees or contractors.

### Main Technologies

- Node.js
- Typescript
- GraphQL
- Apollo Server
- Prisma
- PostgreSQL
- Docker
- Jest

### How to run the project

**IMPORTANT**: The DB dockers will use ports 5433 and 4000. Please, Make sure that these ports are not in use.

### 1. Using docker compose

- Make sure you have docker-compose installed or install the correct version for your OS

```bash
docker-compose -v
```

- Go to the project directory

```bash
cd node-graphql-interview-project-adriano-rosso
```

- Run the command docker-compose up

```bash
docker-compose up
```

- Wait for the process to finish. You should see a message like this: _ 🚀 Server ready at: http://localhost:4000 _

- Run the migrations to create the DB tables:

```bash
docker exec -it employee-api npx prisma migrate deploy
```

- Go to http://localhost:4000 and test the operations.

### 2. Without docker compose

- Create a PostgreSQL docker container

```bash
docker run --name employee-local -p 5433:5432 -e POSTGRES_PASSWORD=postgres -d postgres
```

- Go to the project directory

```bash
cd node-graphql-interview-project-adriano-rosso
```

- Install the dependencies

```bash
npm install
```

- Build the project

```bash
npm run build
```

- Run the migrations to create the DB tables:

```bash
npx prisma migrate deploy
```

- Start the project. You should see this message: _ 🚀 Server ready at: http://localhost:4000 _

```bash
npm run start
```

- Go to http://localhost:4000 and test the operations.

### Comments and assumptions

1. Although contractors and employees are very similar entities for this scope, in my opinion is better to treat them as 2 totally separated
   entities. This way it'll be easier to add diferent properties and methods to each of them and keep the common properties in the member
   (working as an abstract class).
2. Contractor and Employee tables have their own IDs, but just the member ID is considered for the operations.

### Improvements opportunities

As future improvements for the project, I would suggest the following:

- Put the prisma client in a context or convert to singleton.
- Add pagination to the methods that list many results.
