import fp from "fastify-plugin";
import fastifyJwt from "@fastify/jwt";
import { FastifyReply, FastifyRequest } from "fastify";

export default fp(async (app) => {

  app.register(fastifyJwt, {
    secret: process.env.JWT_SECRET || "super-secret-key",
  });

  app.decorate(
    "authenticate",
    async function (req: FastifyRequest, reply: FastifyReply) {
      try {
        await req.jwtVerify();
      } catch (err) {
        reply.code(401).send({ message: "invalid or missing token" });
      }
    }
  );
});
