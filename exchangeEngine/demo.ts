import { matchingEngine, marketMaker, OrderSide, OrderType, Order } from "./index.js";

console.log("==================================================");
console.log("    TRADEFORGE TYPESCRIPT EXCHANGE ENGINE DEMO    ");
console.log("==================================================\n");

// 1. Seed initial market liquidity using MarketMaker bot
const referencePrice = 2500.0;
marketMaker.seedLiquidity(matchingEngine, "RELIANCE", referencePrice, 5, 0.002, 50);

// Print initial order book
matchingEngine.printOrderBook("RELIANCE");

// 2. Real User places a MARKET BUY order for 75 shares
console.log("\n--- Real User places MARKET BUY order for 75 shares ---");
const userBuyOrder: Order = {
    id: "user-order-101",
    userId: "real-user-alpha",
    stockId: "RELIANCE",
    side: OrderSide.BUY,
    type: OrderType.MARKET,
    price: 0,
    quantity: 75,
    remainingQuantity: 75,
    timestamp: Math.floor(Date.now() / 1000)
};

const executedTrades = matchingEngine.processOrder(userBuyOrder);

console.log(`\nExecuted Trades for ${userBuyOrder.id}:`);
for (const trade of executedTrades) {
    console.log(
        ` -> Matched ${trade.quantity} shares @ ₹${trade.price} (Buyer: ${trade.buyOrderId}, Seller: ${trade.sellOrderId})`
    );
}

// Print order book after market buy execution
matchingEngine.printOrderBook("RELIANCE");

// 3. Real User places a LIMIT SELL order at a competitive price (₹2498)
console.log("\n--- Real User places LIMIT SELL order: 20 shares @ ₹2498.00 ---");
const userSellOrder: Order = {
    id: "user-order-102",
    userId: "real-user-beta",
    stockId: "RELIANCE",
    side: OrderSide.SELL,
    type: OrderType.LIMIT,
    price: 2498.0,
    quantity: 20,
    remainingQuantity: 20,
    timestamp: Math.floor(Date.now() / 1000)
};

matchingEngine.processOrder(userSellOrder);

matchingEngine.printOrderBook("RELIANCE");
matchingEngine.printTradeHistory();
