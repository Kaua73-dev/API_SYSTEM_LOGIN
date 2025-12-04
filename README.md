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
### Clone the repositore 
1 ``

### Enter in your project 
2 `cd your-project`


3 `npx prisma migrate dev`
4 `npm run dev`

### Create your .env file

`DATABASE_URL="file:./dev.db"`


How to use
- Access `/public/login.html` in your browser.

- Create a user or log in.

- If




# ROUTES API
All routes:

### Publics

- POST /users 
- GET /users
- POST /users

### ADMIN(protected)

- GET /users:id
- PUT /users:id
- DELETE /users:id


