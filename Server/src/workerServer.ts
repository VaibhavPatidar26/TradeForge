import "dotenv/config";
import redis from "./redis/client.js";
import "./workers/orderWorker.js";
import { runStartupReconciliation } from "./workers/reconciliationWorker.js";

async function startWorkerService() {
    console.log("[Worker Service]  Starting standalone TradeForge Worker process...");

    if (!redis.isOpen) {
        await redis.connect();
        console.log("[Worker Service] Connected to Redis");
    }

    try {
        console.log("[Worker Service] Running startup limit order reconciliation...");
        await runStartupReconciliation();
    } catch (error) {
        console.error("[Worker Service] Startup reconciliation error:", error);
    }

    console.log("[Worker Service] ✅ Standalone Worker process active and consuming OrderExecutionQueue jobs.");
}

startWorkerService();
