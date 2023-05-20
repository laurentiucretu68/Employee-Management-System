"use strict";

import { FastifyInstance } from "fastify";
import { schema } from "../util/schema";
import {
    addPendingLeave, deletePendingLeaveById,
    getAllPendingLeaveForAEmployee,
    getFuturePendingLeaveForAEmployee,
    getPastPendingLeaveForAEmployee,
    getPendingLeaveById, updatePendingLeaveById,
    getAllPendingLeave
} from "../controller/pendingLeaveController";

export async function pendingLeaveRouter(fastify: FastifyInstance) {
    fastify.route({
        method: 'GET',
        url: '/pending-leave',
        handler: getAllPendingLeave,
        schema: schema["/pending-leave"]
    })

    fastify.route({
        method: 'GET',
        url: '/pending-leave/id/:id',
        handler: getPendingLeaveById,
        schema: schema["/pending-leave/id"]
    })

    fastify.route({
        method: 'GET',
        url: '/pending-leave/future/:employeeId',
        handler: getFuturePendingLeaveForAEmployee,
        schema: schema["/pending-leave/future"]
    })

    fastify.route({
        method: 'GET',
        url: '/pending-leave/past/:employeeId',
        handler: getPastPendingLeaveForAEmployee,
        schema: schema["/pending-leave/past"]
    })

    fastify.route({
        method: 'GET',
        url: '/pending-leave/all/:employeeId',
        handler: getAllPendingLeaveForAEmployee,
        schema: schema["/pending-leave/all"]
    })

    fastify.route({
        method: 'POST',
        url: '/pending-leave/add',
        handler: addPendingLeave,
        schema: schema["/pending-leave/add"]
    })

    fastify.route({
        method: 'DELETE',
        url: '/pending-leave/delete/:id',
        handler: deletePendingLeaveById,
        schema: schema["/pending-leave/delete"]
    })

    fastify.route({
        method: 'PUT',
        url: '/pending-leave/update/:id',
        handler: updatePendingLeaveById,
        schema: schema["/pending-leave/update"]
    })
}