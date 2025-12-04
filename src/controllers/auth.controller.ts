import { prisma } from "../lib/prisma";
import { FastifyRequest, FastifyReply } from "fastify";
import { StatusCodes } from "http-status-codes"

interface LoginBody{
    email: string,
    password: string
}

export async function loginController(
req: FastifyRequest,
reply: FastifyReply
) {
    const { email, password } = req.body as LoginBody;


    const user = await prisma.user.findFirst({
        where: {email},
    })

    if(!user || user.password !== password){
        return reply.status(StatusCodes.NOT_FOUND).send({
            message: "invalid credentials"
        })
    }
    
    const token = req.server.jwt.sign({
        id: user.id,
        adm: user.adm
    })

    return reply.send({
        message: "login success ",
        token,
        user: {
            id: user.id,
            email: user.email,
            adm: user.adm
        }

    });
}