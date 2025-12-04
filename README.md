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
- `git clone https://github.com/Kaua73-dev/API_SYSTEM_LOGIN.git`

### Enter in your project 
- `cd your-project`


- `npx prisma migrate dev`
- `npm run dev`

### Create your .env file

`DATABASE_URL="file:./dev.db"`


How to use
- Access `/public/login.html` in your browser.
- Create a user or log in.
- If you are an admin, you can view and delete users through the listUser.


## Admin User for Testing

You can use this admin user to test the system:

- Email: `adm@gmail.com`
- Password: `adm123`
- checkBox: `true`


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


