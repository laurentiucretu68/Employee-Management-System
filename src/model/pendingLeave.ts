"use strict";

import { Schema, model } from "mongoose";

export interface IPendingLeave {
    id?: string;
    employeeId: string;
    employeeName: string;
    employeeEmail: string;
    startDate: number;
    nthDays: number;
    status: boolean;
}

export const pendingLeaveSchema = new Schema<IPendingLeave>({
    id: {
        type: String,
        required: false
    },
    employeeId: {
        type: String,
        required: true
    },
    employeeName: {
        type: String,
        required: true
    },
    employeeEmail: {
        type: String,
        required: true,
    },
    startDate: {
        type: Number,
        required: true
    },
    nthDays: {
        type: Number,
        required: true
    },
    status: {
        type: Boolean
    }
})

export const PendingLeave = model<IPendingLeave>('PendingLeave', pendingLeaveSchema)
