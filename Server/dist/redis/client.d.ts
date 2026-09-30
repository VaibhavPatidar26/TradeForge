export declare const redisConnection: {
    url: string;
    host?: undefined;
    port?: undefined;
} | {
    url?: undefined;
    host: string;
    port: number;
};
declare const redis: import("redis").RedisClientType<{}, {}, {}, 3, {}>;
export declare function setPrice(instrumentKey: string, price: number): Promise<void>;
export default redis;
//# sourceMappingURL=client.d.ts.map