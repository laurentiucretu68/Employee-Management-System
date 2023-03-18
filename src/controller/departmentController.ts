"use strict";

import { IDepartment, Department } from "../model/department"
import {FastifyReply, FastifyRequest} from "fastify";
import {DataBaseError, ProcessingError} from "../util/errors";


export async function getDepartmentById(req: FastifyRequest<{ Params: { id: string }}>, res: FastifyReply) {
    try {
        const { id } = req.params;
        const department = await Department.findById({ _id: id });
        if (!department) {
            res.send(new ProcessingError('department not found').toJSON())
        } else {
            res.send(department)
        }
    } catch (err) {
        res.send(new DataBaseError("error finding department").toJSON())
    }
    return res
}

export async function getDepartments(req: FastifyRequest, res: FastifyReply) {
    try {
        const departments = await Department.find();
        if (!departments) {
            res.send(new ProcessingError('no department found').toJSON())
        } else {
            res.send(departments)
        }
    } catch (err) {
        res.send(new DataBaseError("error finding departments").toJSON())
    }
    return res
}

export async function addDepartment(req: FastifyRequest<{ Body: IDepartment }>, res: FastifyReply) {
    try {
        const department =  await new Department(req.body).save();

        if (!department) {
            res.send(new ProcessingError('department can\'t be added').toJSON())
        } else {
            res.send(department)
        }
    } catch (err) {
        res.send(new DataBaseError("error adding new department").toJSON())
    }
    return res
}

export async function deleteDepartmentById(req: FastifyRequest<{ Params: { id: string }}>, res: FastifyReply) {
    try {
        const { id } = req.params;
        const status = await Department.deleteOne({ _id: id });

        if (!status) {
            res.send(new ProcessingError('department not found').toJSON())
        } else {
            res.send(status)
        }
    } catch (err) {
        res.send(new DataBaseError("error deleting department").toJSON())
    }
    return res
}

export async function updateDepartmentById(req: FastifyRequest<{ Params: { id: string }, Body: IDepartment}>, res: FastifyReply) {
    try {
        const { id } = req.params;
        const status = await Department.updateOne({ _id: id }, { $set: req.body });

        if (!status) {
            res.send(new ProcessingError('department not found').toJSON())
        } else {
            res.send(status)
        }
    } catch (err) {
        res.send(new DataBaseError("error updating department").toJSON())
    }
    return res
}