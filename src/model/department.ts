"use strict";

import { Schema, model } from "mongoose";

export interface IDepartment {
    id?: string;
    name: string;
}

export const departmentSchema = new Schema<IDepartment>({
    id: {
        type: String,
        required: false
    },
    name: {
        type: String,
        required: true
    }
})

export const Department = model<IDepartment>('Department', departmentSchema)