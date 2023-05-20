"use strict";

import Redis from 'ioredis';
import { ValidationError } from './errors';

class RedisSingleton {
    private static instance: Redis

    constructor(config: Object) {
        if (!RedisSingleton.instance) {
            RedisSingleton.instance = new Redis(config);
        }
    }

    getInstance() {
        return RedisSingleton.instance;
    }
}

export let redis: any;

export async function initRedis(){
    const config = {
        host: String(process.env.REDIS_HOST),
        port: Number(process.env.REDIS_PORT),
        db: Number(process.env.REDIS_DATABASES)
    };

    redis = new RedisSingleton(config).getInstance();
    if (redis) {
        console.log("Redis connection successfully established!");
    }
}