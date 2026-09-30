import { Queue } from "bullmq";
import { redisConnection } from "../redis/client.js";
const orderQueue = new Queue("OrderExecutionQueue", { connection: redisConnection });
export default orderQueue;
//# sourceMappingURL=orderQueue.js.map