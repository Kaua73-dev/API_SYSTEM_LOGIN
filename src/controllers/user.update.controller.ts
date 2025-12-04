import { prisma } from "../lib/prisma"
import { FastifyReply, FastifyRequest } from "fastify"
import { userCreateSchema } from "schemas/user.schemas"
import { StatusCodes } from "http-status-codes"


export async function userUpdateController(
req: FastifyRequest,
reply: FastifyReply

) {
    const { id } = req.params as { id: string}
    const data = userCreateSchema.parse(req.body)

    try {
        
        const updated = await prisma.user.update({
            where: { id },
            data
        });

      return reply.status(StatusCodes.OK).send({
        message: 'user updated',
        data: updated
      });
    } catch (error: any) {
        console.log(error)

        return reply.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            message: 'error user update',
            error: error.message
        })
    }
}