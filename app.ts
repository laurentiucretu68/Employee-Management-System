import "dotenv/config";
import Fastify, { FastifyInstance } from "fastify";
import { connectToDatabase, closeDatabaseConnection} from "./src/model";
import { amqpConnect, log } from "./src/util/amqp";
import { initRedis } from "./src/util/redis";
import { ServerError } from "./src/util/errors";
import { fastifyRegisters } from "./src/util/registers";


const fastify: FastifyInstance = Fastify({
    logger: true
});

(async () => {
    try {
        await connectToDatabase()
        await amqpConnect();
        await initRedis();
        await fastifyRegisters(fastify);

        fastify.addHook('onClose', async () => {
            await closeDatabaseConnection()
        })

        await fastify.listen({
            port: Number(process.env.PORT),
            host: process.env.HOST_ADDRESS
        })

    } catch (error) {
        await log.publish(Buffer.from(JSON.stringify(new ServerError('Error on starting server'))));

        console.error(error)
        process.exit(1);
    }
})()