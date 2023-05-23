"use strict";

import { IPendingLeave, PendingLeave } from "../model/pendingLeave"
import {FastifyReply, FastifyRequest} from "fastify";
import {DataBaseError, ProcessingError} from "../util/errors";
import {Employee} from "../model/employee";


export async function getUnapprovedPendingLeave(req: FastifyRequest, res: FastifyReply) {
    try {
        const pendingLeave = await PendingLeave.find({ status: null });
        if (!pendingLeave) {
            res.send(new ProcessingError('pending leaves not found').toJSON())
        } else {
            res.send(pendingLeave)
        }
    } catch (err) {
        res.send(new DataBaseError("error finding pending leave").toJSON())
    }
    return res
}

export async function getAllPendingLeave(req: FastifyRequest, res: FastifyReply) {
    try {
        const pendingLeave = await PendingLeave.find();
        if (!pendingLeave) {
            res.send(new ProcessingError('pending leaves not found').toJSON())
        } else {
            res.send(pendingLeave)
        }
    } catch (err) {
        res.send(new DataBaseError("error finding pending leave").toJSON())
    }
    return res
}

export async function getPendingLeaveById(req: FastifyRequest<{ Params: { id: string }}>, res: FastifyReply) {
    try {
        const { id } = req.params;
        const pendingLeave = await PendingLeave.findById({ _id: id });
        if (!pendingLeave) {
            res.send(new ProcessingError('pending leave not found').toJSON())
        } else {
            res.send(pendingLeave)
        }
    } catch (err) {
        res.send(new DataBaseError("error finding pending leave").toJSON())
    }
    return res
}

export async function getFuturePendingLeaveForAEmployee(req: FastifyRequest<{ Params: { employeeId: string }}>, res: FastifyReply) {
    try {
        const pendingLeave = await PendingLeave.findById({
                                                                _id: req.params.employeeId,
                                                                startDate: { $gt: Date.now() }
                                                        });
        if (!pendingLeave) {
            res.send(new ProcessingError('pending leaves not found').toJSON())
        } else {
            res.send(pendingLeave)
        }
    } catch (err) {
        res.send(new DataBaseError("error finding pending leaves").toJSON())
    }
    return res
}

export async function getPastPendingLeaveForAEmployee(req: FastifyRequest<{ Params: { employeeId: string }}>, res: FastifyReply) {
    try {
        const pendingLeave = await PendingLeave.findById({
                                                            _id: req.params.employeeId,
                                                            startDate: { $lt: Date.now() }
                                                        });
        if (!pendingLeave) {
            res.send(new ProcessingError('pending leaves not found').toJSON())
        } else {
            res.send(pendingLeave)
        }
    } catch (err) {
        res.send(new DataBaseError("error finding pending leaves").toJSON())
    }
    return res
}

export async function getAllPendingLeaveForAEmployee(req: FastifyRequest<{ Params: { employeeId: string }}>, res: FastifyReply) {
    try {
        const pendingLeave = await PendingLeave.findById({ _id: req.params.employeeId });
        if (!pendingLeave) {
            res.send(new ProcessingError('pending leaves not found').toJSON())
        } else {
            res.send(pendingLeave)
        }
    } catch (err) {
        res.send(new DataBaseError("error finding pending leaves").toJSON())
    }
    return res
}

export async function addPendingLeave(req: FastifyRequest<{ Body: IPendingLeave }>, res: FastifyReply) {
    try {
        const checkDaysOff= await Employee.findOne({ _id: req.body.employeeId })
        if (checkDaysOff && Number(checkDaysOff.daysOff) >= req.body.nthDays) {
            const employee = {
                ...req.body,
                employeeName: checkDaysOff.name,
                employeeEmail: checkDaysOff.email,
            }
            console.log(employee)
            const pendingLeave= await new PendingLeave(employee).save();
            if (!pendingLeave) {
                res.send(new ProcessingError('pending leave can\'t be submitted').toJSON())
            } else {
                res.send(pendingLeave)
            }
        } else {
            res.send(new ProcessingError('not enough days').toJSON())
        }
    } catch (err) {
        res.send(new DataBaseError("error adding new pending leave").toJSON())
    }
    return res
}

export async function deletePendingLeaveById(req: FastifyRequest<{ Params: { id: string }}>, res: FastifyReply) {
    try {
        const { id } = req.params;
        const status = await PendingLeave.deleteOne({ _id: id });

        if (!status) {
            res.send(new ProcessingError('pending leave not found').toJSON())
        } else {
            res.send(status)
        }
    } catch (err) {
        res.send(new DataBaseError("error deleting pending leave").toJSON())
    }
    return res
}

export async function updatePendingLeaveById(req: FastifyRequest<{ Params: { id: string }, Body: IPendingLeave}>, res: FastifyReply) {
    try {
        const { id } = req.params;
        const status = await PendingLeave.updateOne({ _id: id }, { $set: req.body });

        if (!status) {
            res.send(new ProcessingError('pending leave not found').toJSON())
        } else {
            res.send(status)
        }
    } catch (err) {
        res.send(new DataBaseError("error updating pending leave").toJSON())
    }
    return res
}