"use strict";

import { FastifyInstance } from "fastify";
import { schema } from "../util/schema";
import {
    getDepartments, getDepartmentById, addDepartment,
    deleteDepartmentById, updateDepartmentById
} from "../controller/departmentController";

export async function departmentRouter(fastify: FastifyInstance) {
    fastify.route({
        method: 'GET',
        url: '/department/:id',
        handler: getDepartmentById,
        schema: schema["/department"]
    })

    fastify.route({
        method: 'GET',
        url: '/departments',
        handler: getDepartments
    })

    fastify.route({
        method: 'POST',
        url: '/department',
        handler: addDepartment,
        schema: schema["/department/add"]
    })

    fastify.route({
        method: 'DELETE',
        url: '/department/:id',
        handler: deleteDepartmentById,
        schema: schema["/department/delete"]
    })

    fastify.route({
        method: 'PUT',
        url: '/department/:id',
        handler: updateDepartmentById,
        schema: schema["/department/update"]
    })
}