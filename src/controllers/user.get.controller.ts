import { prisma } from "../lib/prisma"
import { FastifyReply, FastifyRequest } from "fastify"
import { StatusCodes } from "http-status-codes"

export async function userGetAllController(
req: FastifyRequest,
reply: FastifyReply

) {
    try {
        
        const users = await prisma.user.findMany({
            orderBy: {id: 'asc'},
        });

        return reply.status(StatusCodes.OK).send({
            message: 'users fetched successfully',
            data: users
        });
    } catch (error: any) {
        console.log(error);

        return reply.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            message: "error fetching users",
            error: error.message
        });
    }
}


export async function userGetByIdController(
req: FastifyRequest,
reply: FastifyReply

) {
    const { id } = req.params as { id: string };

    try {
        const user = await prisma.user.findUnique({
            where: { id }
        });

        if(!user){
            return reply.status(StatusCodes.NOT_FOUND).send({
                message: 'user is not found'
            })
        }

        return reply.status(StatusCodes.OK).send({
            message: 'users successfully',
            data: user
        });
    } catch (error: any) {
        console.log(error)
        return reply.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            message: 'error fetched user by id',
            error: error.message
        })
    }
}

