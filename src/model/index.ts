"use strict";

import mongoose from "mongoose";

export async function connectToDatabase() {
    await mongoose.connect(String(process.env.MONGO_URI));
    console.log("Database connection successfully established!\n");
}

export async function closeDatabaseConnection() {
    await mongoose.disconnect();
    console.log("Database connection successfully closed!\n");
}