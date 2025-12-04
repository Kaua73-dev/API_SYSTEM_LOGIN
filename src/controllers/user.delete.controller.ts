import { prisma } from "../lib/prisma"
import { FastifyReply, FastifyRequest } from "fastify"
import { StatusCodes } from "http-status-codes"



export async function userDeleteController(
req: FastifyRequest,
reply: FastifyReply
) {
    const { id } = req.params as { id: string }

    const userToken = req.user 

    if (!userToken.adm) {
        return reply.status(403).send({
            message: "Only admins can delete users"
        })
    }

    // Agora pode deletar
    const user = await prisma.user.delete({
        where: { id }
    })

    return reply.send({
        message: "User deleted",
        user
    })
}

