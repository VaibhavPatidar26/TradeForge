#include <iostream>
#include <ctime>
#include "../include/Order.h"
#include "../include/OrderBook.h"
#include "../include/MatchingEngine.h"
#include "../include/MarketMaker.h"

int main() {
    MatchingEngine engine;
    MarketMaker bot(true); // Enabled

    std::cout << "==================================================\n";
    std::cout << "         TRADEFORGE EXCHANGE ENGINE DEMO          \n";
    std::cout << "==================================================\n\n";

    // 1. Seed initial market liquidity using MarketMaker bot
    double referencePrice = 2500.0;
    bot.seedLiquidity(engine, "RELIANCE", referencePrice, 5, 0.002, 50);

    // Print initial order book populated by the bot
    engine.printOrderBook("RELIANCE");

    // 2. Real User places a MARKET BUY order for 75 shares
    std::cout << "\n--- Real User places MARKET BUY order for 75 shares ---\n";
    Order userBuyOrder;
    userBuyOrder.id = "user-order-101";
    userBuyOrder.userId = "real-user-alpha";
    userBuyOrder.stockId = "RELIANCE";
    userBuyOrder.side = OrderSide::BUY;
    userBuyOrder.type = OrderType::MARKET;
    userBuyOrder.quantity = 75;
    userBuyOrder.remainingQuantity = 75;
    userBuyOrder.timestamp = std::time(nullptr);

    auto executedTrades = engine.processOrder(userBuyOrder);

    std::cout << "\nExecuted Trades for " << userBuyOrder.id << ":\n";
    for (const auto& trade : executedTrades) {
        std::cout << " -> Matched " << trade.quantity << " shares @ $" << trade.price
                  << " (Buyer: " << trade.buyOrderId << ", Seller: " << trade.sellOrderId << ")\n";
    }

    // Print order book after market buy execution
    engine.printOrderBook("RELIANCE");

    // 3. Real User places a LIMIT SELL order at a competitive price ($2498)
    std::cout << "\n--- Real User places LIMIT SELL order: 20 shares @ $2498.00 ---\n";
    Order userSellOrder;
    userSellOrder.id = "user-order-102";
    userSellOrder.userId = "real-user-beta";
    userSellOrder.stockId = "RELIANCE";
    userSellOrder.side = OrderSide::SELL;
    userSellOrder.type = OrderType::LIMIT;
    userSellOrder.price = 2498.00;
    userSellOrder.quantity = 20;
    userSellOrder.remainingQuantity = 20;
    userSellOrder.timestamp = std::time(nullptr);

    engine.processOrder(userSellOrder);

    engine.printOrderBook("RELIANCE");
    engine.printTradeHistory();

    return 0;
}