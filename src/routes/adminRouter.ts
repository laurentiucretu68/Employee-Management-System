"use strict";

import { FastifyInstance } from "fastify";
import { schema } from "../util/schema";
import { getAdminByDepartmentName, login, getSession, logout
} from "../controller/adminController";

export async function adminRouter(fastify: FastifyInstance) {
    fastify.route({
        method: 'GET',
        url: '/admin/:departmentName',
        handler: getAdminByDepartmentName,
        schema: schema["/admin"]
    })

    fastify.route({
        method: 'POST',
        url: '/admin/login',
        handler: login,
        schema: schema["/admin/login"]
    })

    fastify.route({
        method: 'GET',
        url: '/admin/session/:email',
        handler: getSession,
        schema: schema["/admin/session"]
    })

    fastify.route({
        method: 'POST',
        url: '/admin/logout',
        handler: logout,
        schema: schema["/admin/logout"]
    })
}