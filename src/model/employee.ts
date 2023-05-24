"use strict";

import { Schema, model } from "mongoose";

export interface IEmployee {
    id?: string;
    name: string;
    email: string;
    password: string;
    birthDate: number;
    phoneNumber: string;
    department: string,
    address: string,
    daysOff: number
}

export const employeeSchema = new Schema<IEmployee>({
    id: {
        type: String,
        required: false
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    birthDate: {
        type: Number,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    daysOff: {
        type: Number
    }
});

export const Employee = model<IEmployee>('Employee', employeeSchema);