"use strict";

import { Schema, model } from "mongoose";

export interface IDepartment {
    _id?: string;
    name: string;
}

export const departmentSchema = new Schema<IDepartment>({
    _id: {
        type: String,
        required: false
    },
    name: {
        type: String,
        required: true
    }
})

export const Department = model<IDepartment>('Department', departmentSchema)