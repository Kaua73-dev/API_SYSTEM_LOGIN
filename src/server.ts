import fastify, { FastifyRequest, type FastifyInstance } from "fastify";
import autoload from "@fastify/autoload"
import path from "node:path"
import ck from "chalk"
import cors from "@fastify/cors";
import jwtPlugin from "./plugins/jwt";

export async function StartServer() {
    


const app = fastify()

app.addHook('onRoute', route => {
    if(route.method != "HEAD" && route.method != "OPTIONS"){
        console.log(`${ck.yellow(route.method)} ${ck.blue(route.path)}`);
    }
});

app.register(cors, {
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
});

// registra pluggin
app.register(jwtPlugin);


app.register(autoload, {
    dir: path.join(path.resolve(), "src/routes"),
    routeParams: true
});


const port = Number(process.env.PORT ?? 3333)

try {
    
await app.listen({port, host: '0.0.0.0'})   
console.log(ck.green(`${ck.underline("Fastify")} server listen on ${port}`))
} catch (err) {
    console.error(`failed to the start connection ${err}`);
    process.exit(1);
}
};


export type RouterHandler = (app: FastifyInstance) => any;
export function DefineRoutes(handler: RouterHandler){
    return function (app:  FastifyInstance,_opts: any, done: () => void ){
        handler(app)
        done()
    }
};



StartServer().catch((err) => {
    console.error(`error star server ${err}`)
    process.exit(1)
});