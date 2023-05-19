"use strict";

import { IDepartment, Department } from "../model/department"
import { FastifyReply, FastifyRequest } from "fastify";
import { DataBaseError, ProcessingError } from "../util/errors";


export async function getDepartmentById(req: FastifyRequest<{ Params: { id: string }}>, res: FastifyReply) {
    let department = null
    try {
        const { id } = req.params;
        department = await Department.findById({ _id: id });
    } catch (err) {
        throw new DataBaseError("error finding department")
    }

    if (!department) {
        throw new ProcessingError('department not found')
    }
    res.send(department)
    return res
}

export async function getDepartments(req: FastifyRequest, res: FastifyReply) {
    let departments = null
    try {
        departments = await Department.find();
    } catch (err) {
        throw new DataBaseError("error finding departments")
    }

    if (!departments) {
        throw new ProcessingError('no department found')
    }
    res.send(departments)
    return res
}

export async function addDepartment(req: FastifyRequest<{ Body: IDepartment }>, res: FastifyReply) {
    let result = null
    try {
         result = await Department.findOne({ name: req.body.name })
        if (result) {
            res.send(new ProcessingError("department already exists").toJSON())
        }
        const department =  await new Department(req.body).save();
        if (!department) {
            res.send(new ProcessingError('department can\'t be added'))
        }
        res.send(department)
    } catch (err) {
        throw new DataBaseError("error adding new department")
    }
    return res
}

export async function deleteDepartmentById(req: FastifyRequest<{ Params: { id: string }}>, res: FastifyReply) {
    let status = null
    try {
        const { id } = req.params;
        status = await Department.deleteOne({ _id: id });
    } catch (err) {
        throw new DataBaseError("error deleting department")
    }

    if (!status) {
        throw new ProcessingError('department not found')
    }
    res.send(status)
    return res
}

export async function updateDepartmentById(req: FastifyRequest<{ Params: { id: string }, Body: IDepartment}>, res: FastifyReply) {
    let status = null
    try {
        const { id } = req.params;
        status = await Department.updateOne({ _id: id }, { $set: req.body });
    } catch (err) {
        res.send(new DataBaseError("error updating department").toJSON())
    }

    if (!status) {
        throw new ProcessingError('department not found')
    }
    res.send(status)
    return res
}