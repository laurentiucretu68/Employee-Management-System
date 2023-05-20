"use strict";

import { FastifyInstance } from "fastify";
import { schema } from "../util/schema";
import { getAdminByDepartmentName, loginAdmin, getSessionAdmin, logoutAdmin } from "../controller/adminController";

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
        handler: loginAdmin,
        schema: schema["/admin/login"]
    })

    fastify.route({
        method: 'GET',
        url: '/admin/session/:email',
        handler: getSessionAdmin,
        schema: schema["/admin/session"]
    })

    fastify.route({
        method: 'POST',
        url: '/admin/logout',
        handler: logoutAdmin,
        schema: schema["/admin/logout"]
    })
}