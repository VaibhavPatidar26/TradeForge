import { Order, OrderSide, OrderType, Trade } from "./types.js";
import { OrderBook } from "./OrderBook.js";

export class MatchingEngine {
    private orderBooks: Map<string, OrderBook> = new Map();
    private tradeHistory: Trade[] = [];

    public getOrderBook(stockId: string): OrderBook {
        if (!this.orderBooks.has(stockId)) {
            this.orderBooks.set(stockId, new OrderBook());
        }
        return this.orderBooks.get(stockId)!;
    }

    public processOrder(incomingOrder: Order): Trade[] {
        const matchedTrades: Trade[] = [];
        const orderBook = this.getOrderBook(incomingOrder.stockId);
        const order = { ...incomingOrder }; // Shallow copy

        if (order.side === OrderSide.BUY) {
            while (order.remainingQuantity > 0 && orderBook.hasSellOrders()) {
                const bestSell = orderBook.getBestSellOrder();
                if (!bestSell) break;

                // Price matching check for LIMIT orders
                if (order.type === OrderType.LIMIT && order.price < bestSell.price) {
                    break; // Price condition not satisfied
                }

                const matchQuantity = Math.min(order.remainingQuantity, bestSell.remainingQuantity);
                const matchPrice = bestSell.price; // Passive sell order price

                const trade: Trade = {
                    buyOrderId: order.id,
                    sellOrderId: bestSell.id,
                    stockId: order.stockId,
                    price: matchPrice,
                    quantity: matchQuantity,
                    timestamp: Math.floor(Date.now() / 1000)
                };

                order.remainingQuantity -= matchQuantity;
                bestSell.remainingQuantity -= matchQuantity;

                matchedTrades.push(trade);
                this.tradeHistory.push(trade);

                if (bestSell.remainingQuantity === 0) {
                    orderBook.removeBestSellOrder();
                }
            }

            // If remaining quantity exists and it's a LIMIT order, add to OrderBook
            if (order.remainingQuantity > 0 && order.type === OrderType.LIMIT) {
                orderBook.addOrder(order);
            }
        } else if (order.side === OrderSide.SELL) {
            while (order.remainingQuantity > 0 && orderBook.hasBuyOrders()) {
                const bestBuy = orderBook.getBestBuyOrder();
                if (!bestBuy) break;

                // Price matching check for LIMIT orders
                if (order.type === OrderType.LIMIT && order.price > bestBuy.price) {
                    break; // Price condition not satisfied
                }

                const matchQuantity = Math.min(order.remainingQuantity, bestBuy.remainingQuantity);
                const matchPrice = bestBuy.price; // Passive buy order price

                const trade: Trade = {
                    buyOrderId: bestBuy.id,
                    sellOrderId: order.id,
                    stockId: order.stockId,
                    price: matchPrice,
                    quantity: matchQuantity,
                    timestamp: Math.floor(Date.now() / 1000)
                };

                order.remainingQuantity -= matchQuantity;
                bestBuy.remainingQuantity -= matchQuantity;

                matchedTrades.push(trade);
                this.tradeHistory.push(trade);

                if (bestBuy.remainingQuantity === 0) {
                    orderBook.removeBestBuyOrder();
                }
            }

            // If remaining quantity exists and it's a LIMIT order, add to OrderBook
            if (order.remainingQuantity > 0 && order.type === OrderType.LIMIT) {
                orderBook.addOrder(order);
            }
        }

        return matchedTrades;
    }

    public getTradeHistory(): Trade[] {
        return this.tradeHistory;
    }

    public printOrderBook(stockId: string): void {
        const book = this.orderBooks.get(stockId);
        if (book) {
            console.log(`Order Book for ${stockId}:`);
            book.printOrderBook();
        } else {
            console.log(`No order book found for ${stockId}`);
        }
    }

    public printTradeHistory(): void {
        console.log("\n========== TRADE HISTORY ==========");
        if (this.tradeHistory.length === 0) {
            console.log("No trades executed yet.");
        } else {
            for (const trade of this.tradeHistory) {
                console.log(
                    `Stock: ${trade.stockId} | Buy: ${trade.buyOrderId} | Sell: ${trade.sellOrderId} | Price: ₹${trade.price} | Qty: ${trade.quantity} | Time: ${trade.timestamp}`
                );
            }
        }
        console.log("===================================\n");
    }
}

// Export singleton instance for app-wide use
export const matchingEngine = new MatchingEngine();
