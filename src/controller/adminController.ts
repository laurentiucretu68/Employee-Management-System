"use strict";

import { Admin } from "../model/admin";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { encryptPassword } from "../util/tokenGenerator";
import { redis } from "../util/redis";
import {DataBaseError, ProcessingError } from "../util/errors";
import {log} from "../util/amqp";

export async function getAdminByDepartmentName(req: FastifyRequest<{ Params: { departmentName: string }}>, res: FastifyReply) {
    let admin = null
    try {
        admin = await Admin.findOne({ departmentName: req.params.departmentName });
    } catch (err) {
        const error = new DataBaseError("error getting admin ").toJSON()
        await log.publish(Buffer.from(JSON.stringify(error)));
        res.send(error)
    }

    if (!admin) {
        throw new ProcessingError("user not found")
    }
    res.send(admin)
    return res
}

export async function loginAdmin(this: FastifyInstance, req: FastifyRequest<{ Body: { email: string, password: string }}>, res: FastifyReply) {
    try {
        const { email, password } = req.body;
        const admin = await Admin.findOne({ email: email, password: encryptPassword(password) });

        if (admin) {
            const tokenJWT = this.jwt.sign(admin)

            await redis.select(1) // redis database for login sessions
            const response = await redis.set(email, tokenJWT, 'EX', 300 * 60);

            if (response) {
                res.send(tokenJWT);
            } else {
                res.send(new ProcessingError('Login failed').toJSON());
            }
        } else {
            res.send(new ProcessingError('Admin not found').toJSON());
        }
    } catch (err) {
        const error = new DataBaseError("admin authentication error\n")
        res.send(error.toJSON())
        await log.publish(Buffer.from(JSON.stringify(error)));
    }
    return res
}

export async function logoutAdmin(this: FastifyInstance, req: FastifyRequest<{ Body: { email: string }}>, res: FastifyReply) {
    try {
        const { email } = req.body;
        const admin = await Admin.findOne({ email: email });

        if (admin) {
            await redis.select(1)
            const token = await redis.get(email);

            if (token) {
                this.jwt.verify(token);
                await redis.del(email);

                res.send({  });
            } else {
                res.send(new ProcessingError('Login failed').toJSON());
            }
        } else {
            res.send(new ProcessingError('Admin not found').toJSON());
        }
    } catch (err) {
        const error = new DataBaseError("admin authentication error\n")
        res.send(error.toJSON())
        await log.publish(Buffer.from(JSON.stringify(error)));
    }
    return res
}

export async function getSessionAdmin(req: FastifyRequest<{ Params: { email: string }}>, res: FastifyReply) {
    try {
        const { email } = req.params
        const response = await redis.get(email);
        if (response) {
            res.send({ jwt: response })
        } else {
            res.send(new ProcessingError(`No session found`).toJSON());
        }
    } catch (err) {
        const error = new DataBaseError("error finding session\n")
        res.send(error.toJSON())
        await log.publish(Buffer.from(JSON.stringify(error)));
    }
    return res
}