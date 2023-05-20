"use strict";


const stringType = {
    type: "string"
}
const numberType = {
    type: "number"
}
const uuidType = {
    type: "string"
}

const emailType = {
    type: "string",
    format: "email"
}

export const schema = {
    "/admin": {
        params: {
            type: "object",
            properties: {
                departmentName: stringType
            },
            required: ["departmentName"]
        }
    },
    "/admin/login": {
        body: {
            type: "object",
            properties: {
                email: emailType,
                password: stringType,
            },
            required: ["email", "password"]
        }
    },
    "/admin/session": {
        params: {
            type: "object",
            properties: {
                email: emailType
            },
            required: ["email"]
        }
    },
    "/admin/logout": {
        body: {
            type: "object",
            properties: {
                email: emailType
            },
            required: ["email"]
        }
    },

    "/employee": {
        params: {
            type: "object",
            properties: {
                id: uuidType
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
                name: stringType,
                email: emailType,
                password: stringType,
                birthDate: numberType,
                phoneNumber: stringType,
                department: stringType,
                address: stringType,
                daysOff: numberType
            },
            required: ["name", "email", "password", "birthDate", "phoneNumber", "department", "address", "daysOff"]
        }
    },
    "/employee/update": {
        params: {
            type: "object",
            properties: {
                id: uuidType
            },
            required: ["id"]
        },
        body: {
            type: "object",
            properties: {
                name: stringType,
                email: emailType,
                password: stringType,
                birthDate: numberType,
                phoneNumber: stringType,
                department: stringType,
                address: stringType,
                daysOff: numberType
            }
        }
    },
    "/employee/login": {
        body: {
            type: "object",
            properties: {
                email: emailType,
                password: stringType,
            },
            required: ["email", "password"]
        }
    },
    "/employee/session": {
        params: {
            type: "object",
            properties: {
                email: emailType
            },
            required: ["email"]
        }
    },
    "/employee/logout": {
        body: {
            type: "object",
            properties: {
                email: emailType
            },
            required: ["email"]
        }
    },

    "/pending-leave": {
        params: {
            type: "object"
        }
    },
    "/pending-leave/id": {
        params: {
            type: "object",
            properties: {
                id: uuidType
            },
            required: ["id"]
        }
    },
    "/pending-leave/future": {
        params: {
            type: "object",
            properties: {
                employeeId: uuidType
            },
            required: ["employeeId"]
        }
    },
    "/pending-leave/past": {
        params: {
            type: "object",
            properties: {
                employeeId: uuidType
            },
            required: ["employeeId"]
        }
    },
    "/pending-leave/all": {
        params: {
            type: "object",
            properties: {
                employeeId: uuidType
            },
            required: ["employeeId"]
        }
    },
    "/pending-leave/add": {
        body: {
            type: "object",
            properties: {
                employeeId: uuidType,
                startDate: numberType,
                nthDays: numberType,
            },
            required: ["employeeId", "startDate", "nthDays"]
        }
    },
    "/pending-leave/delete": {
        params: {
            type: "object",
            properties: {
                id: uuidType
            },
            required: ["id"]
        }
    },
    "/pending-leave/update": {
        params: {
            type: "object",
            properties: {
                id: uuidType
            },
            required: ["id"]
        },
        body: {
            type: "object",
            properties: {
                employeeId: uuidType,
                startDate: numberType,
                nthDays: numberType,
            }
        }
    },

    "/department": {
        params: {
            type: "object",
            properties: {
                id: uuidType
            },
            required: ["id"]
        }
    },
    "/department/add": {
        body: {
            type: "object",
            properties: {
                name: stringType
            },
            required: ["name"]
        }
    },
    "/department/delete": {
        params: {
            type: "object",
            properties: {
                id: uuidType
            },
            required: ["id"]
        }
    },
    "/department/update": {
        params: {
            type: "object",
            properties: {
                id: uuidType
            },
            required: ["id"]
        },
        body: {
            type: "object",
            properties: {
                name: stringType
            }
        }
    },
}