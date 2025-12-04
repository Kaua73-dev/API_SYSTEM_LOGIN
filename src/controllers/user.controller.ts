import { prisma } from "../lib/prisma"
import { userCreateSchema } from "schemas/user.schemas"
import { FastifyReply, FastifyRequest } from "fastify"
import { StatusCodes } from "http-status-codes"

export async function userCreateController(
    req: FastifyRequest, 
    reply: FastifyReply
) {
    const { email, password, adm } = userCreateSchema.parse(req.body)

    try {
        const user = await prisma.user.create({
            data: {
                email,
                password,
                adm: adm ?? false
            },
        })


        const token = req.server.jwt.sign({
            id: user.id,
            adm: user.adm
        })

        return reply.status(StatusCodes.CREATED).send({
            message: "user create successfully",
            data: {
            token,
            user
           }
        })

    } catch (error: any) {
        console.log(error)

        return reply
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .send({
                message: "error create account",
                error: error.message
            })
    }
}
