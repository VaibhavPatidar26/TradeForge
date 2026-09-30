import { Worker } from "bullmq";
import { type Order } from "../queues/orderQueue.js";
export declare const orderWorker: Worker<Order, any, string, import("bullmq").RedisQueueBackend, import("bullmq").JobProgress, import("bullmq").ConnectionOptions>;
export default orderWorker;
//# sourceMappingURL=orderWorker.d.ts.map