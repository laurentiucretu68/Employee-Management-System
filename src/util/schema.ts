"use strict";

export const schema = {
    "/employee": {
        params: {
            type: "object",
            properties: {
                id: {
                    type: "string"
                }
            },
            required: ["id"]
        }
    },
    "/employees": {
        params: {
            type: "object",
            properties: {
                name: {
                    type: "string"
                }
            },
            required: ["name"]
        }
    },
    "/employee/add": {
        body: {
            type: "object",
            properties: {
                name: { type: "string" },
                email: {
                    type: "string",
                    format: "email"
                },
                password: { type: "string" },
                age: {
                    type: "number",
                    minimum: 18
                },
                phoneNumber: { type: "string" },
                department: { type: "string" }
            },
            required: ["name", "email", "password", "age", "phoneNumber", "department"]
        }
    },
    "/employee/update": {
        params: {
            type: "object",
            properties: {
                id: {
                    type: "string"
                }
            },
            required: ["id"]
        },
        body: {
            type: "object",
            properties: {
                name: { type: "string" },
                email: {
                    type: "string",
                    format: "email"
                },
                password: { type: "string" },
                age: {
                    type: "number",
                    minimum: 18
                },
                phoneNumber: { type: "string" },
                department: { type: "string" }
            }
        }
    },
    "/employee/login": {
        body: {
            type: "object",
            properties: {
                email: {
                    type: "string",
                    format: "email"
                },
                password: { type: "string" },
            },
            required: ["email", "password"]
        }
    },
    "/employee/session": {
        params: {
            type: "object",
            properties: {
                email: {
                    type: "string",
                    format: "email"
                }
            },
            required: ["email"]
        }
    },
    "/department": {
        params: {
            type: "object",
            properties: {
                id: {
                    type: "string"
                }
            },
            required: ["id"]
        }
    },
    "/department/add": {
        body: {
            type: "object",
            properties: {
                name: { type: "string" }
            },
            required: ["name"]
        }
    },
    "/department/delete": {
        params: {
            type: "object",
            properties: {
                id: {
                    type: "string"
                }
            },
            required: ["id"]
        }
    },
    "/department/update": {
        params: {
            type: "object",
            properties: {
                id: {
                    type: "string"
                }
            },
            required: ["id"]
        },
        body: {
            type: "object",
            properties: {
                name: { type: "string" }
            }
        }
    },
}