import { FastifyRequest, FastifyReply} from "fastify";
import { StatusCodes } from "http-status-codes"

export async function isAdmin(
req: FastifyRequest,
reply: FastifyReply
) {
    const user = req.user as any;

    if(!user?.adm){
        return reply.status(StatusCodes.FORBIDDEN).send({
            message: "Acesso negado. Apenas administradores podem usar esta rota."
        });
    }
}