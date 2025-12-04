# user CRUD with fastify, prism and JWT
A complete backend, with JWT authentication, using fastify and TypeScript


## Features

- create users .
- login users .
- get users by ID .
- get all users .
- view users ( only adm ).
- delete users ( only adm ).


## technologies

- Node.js 
- fastify 
- Prism ORM 
- TypeScript 
- JWT 
- Tailwind Css 
- HTML 
- CSS 

### DataBase 
- SQLite




# How to run the Project
In the terminal, run: 

`npx prisma migrate dev`
`npm run dev`

### Create your .env file

`DATABASE_URL="file:./dev.db"`





# ROUTES API
All routes:

### Publics

POST /users 
GET /users
POST /users

### ADMIN(protected)

GET /users:id
PUT /users:id
DELETE /users:id


