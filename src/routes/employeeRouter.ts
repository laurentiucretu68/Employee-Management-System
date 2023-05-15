"use strict";

import { FastifyInstance } from "fastify";
import { schema } from "../util/schema";
import {
    addEmployee, getEmployees, getEmployeeById, getUsersByDepartmentName,
    deleteEmployeeById, updateEmployeeById, login, getSession, logout
} from "../controller/employeeController";

export async function employeeRouter(fastify: FastifyInstance) {
    fastify.route({
        method: 'POST',
        url: '/employee/login',
        handler: login,
        schema: schema["/employee/login"]
    })

    fastify.route({
        method: 'GET',
        url: '/employee/session/:email',
        handler: getSession,
        schema: schema["/employee/session"]
    })

    fastify.route({
        method: 'POST',
        url: '/employee/logout',
        handler: logout,
        schema: schema["/employee/logout"]
    })

    fastify.route({
        method: 'GET',
        url: '/employee/:id',
        handler: getEmployeeById,
        schema: schema["/employee"]
    })

    fastify.route({
        method: 'GET',
        url: '/employees',
        handler: getEmployees
    })

    fastify.route({
        method: 'GET',
        url: '/employees/:name',
        handler: getUsersByDepartmentName,
        schema: schema["/employees"]
    })

    fastify.route({
        method: 'POST',
        url: '/employee',
        handler: addEmployee,
        schema: schema["/employee/add"]
    })

    fastify.route({
        method: 'DELETE',
        url: '/employee/:id',
        handler: deleteEmployeeById,
        schema: schema["/employee"]
    })

    fastify.route({
        method: 'PUT',
        url: '/employee/:id',
        handler: updateEmployeeById,
        schema: schema["/employee/update"]
    })
}