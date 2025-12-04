import { DefineRoutes } from "#server";
import { userCreateController } from "controllers/user.controller";
import { userDeleteController } from "controllers/user.delete.controller"
import { userGetAllController, userGetByIdController} from "controllers/user.get.controller"
import { userUpdateController } from "controllers/user.update.controller"
import { loginController } from "controllers/auth.controller"
import { isAdmin } from "middlewares/isAdmin";
import { FastifyRequest, FastifyReply, type FastifyInstance } from "fastify";
import { prisma } from "lib/prisma";



export default DefineRoutes((app: FastifyInstance) => {


    app.get('/', (req: FastifyRequest, reply: FastifyReply) => {
        reply.status(200).send({
            message: "hello world"
        })
    });


app.post("/users", userCreateController)
app.get("/users", userGetAllController);
app.post("/login",loginController)

// rotas protejudas com jwt 
const auth = { preHandler: [app.authenticate] }

app.get("/users/:id", auth, userGetByIdController);
app.put("/users/:id", auth, userUpdateController);
app.delete("/users/:id", auth, userDeleteController);


// route adm 
app.post(
  "/admin/create",
  {
    preHandler: [app.authenticate, isAdmin]
  },
  async (req: FastifyRequest, reply: FastifyReply) => {
    const { email, password } = req.body as any;

    const user = await prisma.user.create({
      data: {
        email,
        password,
        adm: true
      }
    });

    return reply.send({
      message: "Admin created successfully",
      data: user
    });
  }
);



});