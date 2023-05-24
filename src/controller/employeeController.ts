"use strict";

import { IEmployee, Employee } from "../model/employee"
import { Department } from "../model/department";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { encryptPassword } from "../util/tokenGenerator";
import { redis } from "../util/redis";
import { DataBaseError, ProcessingError } from "../util/errors";
import {log} from "../util/amqp";


export async function getEmployeeById(req: FastifyRequest<{ Params: { id: string }}>, res: FastifyReply) {
    try {
        const { id } = req.params;
        const employee = await Employee.findById({ _id: id });
        if (!employee) {
            res.send(new ProcessingError("user not found").toJSON())
        } else {
            res.send(employee)
        }
    } catch (err) {
        const error = new DataBaseError("error finding pending employee\n")
        res.send(error.toJSON())
        await log.publish(Buffer.from(JSON.stringify(error)));
    }
    return res
}

export async function getEmployees(req: FastifyRequest, res: FastifyReply) {
    try {
        const employees = await Employee.find();
        if (!employees) {
            res.send(new ProcessingError("no user found").toJSON())
        } else {
            res.send(employees)
        }
    } catch (err) {
        const error = new DataBaseError("error finding pending employees\n")
        res.send(error.toJSON())
        await log.publish(Buffer.from(JSON.stringify(error)));
    }
    return res
}

export async function addEmployee(req: FastifyRequest<{ Body: IEmployee }>, res: FastifyReply) {
    try {
        const department = await Department.findOne({ name: req.body.department })
        if (!department) {
            res.send(new ProcessingError("Department doesn't exist").toJSON())
        } else {
            req.body.password = encryptPassword(req.body.password)
            const daysOff = (12 - new Date().getMonth()) * 3;
            const employee =  await new Employee({ ...req.body, daysOff}).save();

            if (!employee) {
                res.send(new ProcessingError("user cannot be inserted").toJSON())
            } else {
                res.send(employee)
            }
        }
    } catch (err) {
        const error = new DataBaseError("error adding employee\n")
        res.send(error.toJSON())
        await log.publish(Buffer.from(JSON.stringify(error)));
    }
    return res
}

export async function deleteEmployeeById(req: FastifyRequest<{ Params: { id: string }}>, res: FastifyReply) {
    try {
        const { id } = req.params;
        const status = await Employee.deleteOne({ _id: id });

        if (!status) {
            res.send(new ProcessingError("user not found"))
        } else {
            res.send(status)
        }
    } catch (err) {
        const error = new DataBaseError("error deleting employee\n")
        res.send(error.toJSON())
        await log.publish(Buffer.from(JSON.stringify(error)));
    }
    return res
}

export async function updateEmployeeById(req: FastifyRequest<{ Params: { id: string }, Body: IEmployee}>, res: FastifyReply) {
    try {
        const { id } = req.params;
        if (req.body.password) {
            req.body.password = encryptPassword(req.body.password)
        }
        const status = await Employee.updateOne({ _id: id }, { $set: req.body });

        if (!status) {
            res.send(new ProcessingError("user not found").toJSON())
        } else {
            res.send(status)
        }
    } catch (err) {
        const error = new DataBaseError("error updating employee\n")
        res.send(error.toJSON())
        await log.publish(Buffer.from(JSON.stringify(error)));
    }
    return res
}

export async function getUsersByDepartmentName(req: FastifyRequest<{ Params: { name: string }}>, res: FastifyReply) {
    try {
        const { name } = req.params
        const employees = await Employee.find({ department: name })

        if (!employees) {
            res.send(new ProcessingError("user not found").toJSON())
        } else {
            res.send(employees)
        }
    } catch (err) {
        const error = new DataBaseError("error finding employee\n")
        res.send(error.toJSON())
        await log.publish(Buffer.from(JSON.stringify(error)));
    }
    return res
}

export async function login(this: FastifyInstance, req: FastifyRequest<{ Body: { email: string, password: string }}>, res: FastifyReply) {
    const { email, password } = req.body;
    try {
        const employee = await Employee.findOne({ email: email, password: encryptPassword(password) });
        if (employee) {
            const tokenJWT = this.jwt.sign(employee)

            await redis.select(1) // redis database for login sessions
            const response = await redis.set(email, tokenJWT, 'EX', 300 * 60);

            if (response) {
                res.send({ tokenJWT });
            } else {
                res.send(new ProcessingError('Login failed').toJSON());
            }
        } else {
            res.send(new ProcessingError('Employee not found').toJSON());
        }
    } catch (err) {
        const error = new DataBaseError("employee authentication error\n")
        res.send(error.toJSON())
        await log.publish(Buffer.from(JSON.stringify(error)));
    }
    return res
}

export async function logout(this: FastifyInstance, req: FastifyRequest<{ Body: { email: string }}>, res: FastifyReply) {
    const { email } = req.body;
    try {
        const employee = await Employee.findOne({ email: email });
        if (employee) {
            await redis.select(1) // redis database for login sessions
            const token = await redis.get(email);

            if (token) {
                this.jwt.verify(token);
                await redis.del(email);

                res.send({  });
            } else {
                res.send(new ProcessingError('Login failed').toJSON());
            }
        } else {
            res.send(new ProcessingError('Employee not found').toJSON());
        }
    } catch (err) {
        const error = new DataBaseError("employee authentication error\n")
        res.send(error.toJSON())
        await log.publish(Buffer.from(JSON.stringify(error)));
    }
    return res
}

export async function getSession(req: FastifyRequest<{ Params: { email: string }}>, res: FastifyReply) {
    const { email } = req.params
    try {
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