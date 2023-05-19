"use strict";

import { Schema, model } from "mongoose";

export interface IAdmin {
    id?: string;
    email: string;
    password: string;
    phoneNumber: string;
    departmentName: string;
}

export const adminSchema = new Schema<IAdmin>({
    id: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    departmentName: {
        type: String,
        required: true
    }
});

export const Admin = model<IAdmin>('Employee', adminSchema);