#include "../include/MarketMaker.h"
#include <ctime>
#include <iostream>
#include <cmath>

MarketMaker::MarketMaker(bool isEnabled) : enabled(isEnabled) {}

void MarketMaker::setEnabled(bool isEnabled) {
    enabled = isEnabled;
}

bool MarketMaker::isEnabled() const {
    return enabled;
}

void MarketMaker::seedLiquidity(MatchingEngine& engine,
                                const std::string& stockId,
                                double referencePrice,
                                int levels,
                                double stepPercent,
                                int baseQuantity) {
    if (!enabled) {
        std::cout << "[MarketMaker] Bot is disabled. Skipping liquidity seeding for " << stockId << ".\n";
        return;
    }

    std::cout << "[MarketMaker] Seeding " << levels << " levels of liquidity for " << stockId
              << " around reference price " << referencePrice << "...\n";

    long long now = std::time(nullptr);

    // 1. Seed ASK (Sell Limit Orders above reference price)
    for (int i = 1; i <= levels; ++i) {
        Order sellOrder;
        sellOrder.id = "mm-sell-" + std::to_string(i);
        sellOrder.userId = "MARKET_MAKER_BOT";
        sellOrder.stockId = stockId;
        sellOrder.side = OrderSide::SELL;
        sellOrder.type = OrderType::LIMIT;
        
        // Round to 2 decimal places
        double price = referencePrice * (1.0 + i * stepPercent);
        sellOrder.price = std::round(price * 100.0) / 100.0;
        
        int qty = baseQuantity * i;
        sellOrder.quantity = qty;
        sellOrder.remainingQuantity = qty;
        sellOrder.timestamp = now + i;

        engine.processOrder(sellOrder);
    }

    // 2. Seed BID (Buy Limit Orders below reference price)
    for (int i = 1; i <= levels; ++i) {
        Order buyOrder;
        buyOrder.id = "mm-buy-" + std::to_string(i);
        buyOrder.userId = "MARKET_MAKER_BOT";
        buyOrder.stockId = stockId;
        buyOrder.side = OrderSide::BUY;
        buyOrder.type = OrderType::LIMIT;

        double price = referencePrice * (1.0 - i * stepPercent);
        buyOrder.price = std::round(price * 100.0) / 100.0;

        int qty = baseQuantity * i;
        buyOrder.quantity = qty;
        buyOrder.remainingQuantity = qty;
        buyOrder.timestamp = now + i;

        engine.processOrder(buyOrder);
    }

    std::cout << "[MarketMaker] Liquidity successfully seeded for " << stockId << ".\n";
}
