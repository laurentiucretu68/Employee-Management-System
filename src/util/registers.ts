"use strict";

import "@fastify/jwt";
import { FastifyInstance } from "fastify";
import { employeeRouter } from "../routes/employeeRouter";
import { departmentRouter } from "../routes/departmentRouter";
import {pendingLeaveRouter} from "../routes/pendingLeaveRouter";
import { IAdmin } from "../model/admin";
import { IEmployee } from "../model/employee";
import { adminRouter } from "../routes/adminRouter";
import cors from "@fastify/cors";


declare module 'fastify' {
    interface FastifyInstance {
        auth: (options: unknown) => (request: FastifyRequest, reply: unknown, done: unknown) => void;
    }
    interface FastifyRequest {
        admin: IAdmin;
        employee: IEmployee;
    }
}

export async function fastifyRegisters(fastify: FastifyInstance) {

    // Documentation
    fastify.register(require('@fastify/swagger'))
    fastify.register(require('@fastify/swagger-ui'), {
        routePrefix: '/documentation',
        uiConfig: {
            docExpansion: 'full',
            deepLinking: false,
        },
        staticCSP: true,
        transformStaticCSP: (header: any) => header,
        transformSpecification: (swaggerObject: any, req: any, res: any) => { return swaggerObject },
        transformSpecificationClone: true
    })

    // AUTH
    fastify.register(require('@fastify/jwt'), {
        secret: process.env.TOKEN_AUTH,
        signOptions: {
            expiresIn: '300m'
        }
    });
    fastify.register(require('@fastify/auth'));
    fastify.register(cors)

    // Routes
    fastify.register(adminRouter);
    fastify.register(employeeRouter);
    fastify.register(departmentRouter);
    fastify.register(pendingLeaveRouter);
}