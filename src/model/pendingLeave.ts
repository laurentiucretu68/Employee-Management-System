"use strict";

import { Schema, model } from "mongoose";

export interface IPendingLeave {
    _id?: string;
    employeeId: string;
    startDate: number;
    nthDays: number;
}

export const pendingLeaveSchema = new Schema<IPendingLeave>({
    _id: {
        type: String,
        required: false
    },
    employeeId: {
        type: String,
        required: true
    },
    startDate: {
        type: Number,
        required: true
    },
    nthDays: {
        type: Number,
        required: true
    },
})

export const PendingLeave = model<IPendingLeave>('PendingLeave', pendingLeaveSchema)