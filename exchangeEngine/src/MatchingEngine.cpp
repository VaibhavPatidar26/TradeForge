#include "../include/MatchingEngine.h"
#include <iostream>
#include <algorithm>
#include <ctime>

std::vector<Trade> MatchingEngine::processOrder(Order incomingOrder) {
    std::vector<Trade> matchedTrades;
    OrderBook& orderBook = orderBooks[incomingOrder.stockId];

    if (incomingOrder.side == OrderSide::BUY) {
        while (incomingOrder.remainingQuantity > 0 && orderBook.hasSellOrders()) {
            Order* bestSell = orderBook.getBestSellOrder();

            if (incomingOrder.type == OrderType::LIMIT && incomingOrder.price < bestSell->price) {
                break; // Limit price condition not met
            }

            int matchQuantity = std::min(incomingOrder.remainingQuantity, bestSell->remainingQuantity);
            double matchPrice = bestSell->price; // Passive order price

            Trade trade;
            trade.buyOrderId = incomingOrder.id;
            trade.sellOrderId = bestSell->id;
            trade.stockId = incomingOrder.stockId;
            trade.price = matchPrice;
            trade.quantity = matchQuantity;
            trade.timestamp = std::time(nullptr);

            incomingOrder.remainingQuantity -= matchQuantity;
            bestSell->remainingQuantity -= matchQuantity;

            matchedTrades.push_back(trade);
            tradeHistory.push_back(trade);

            if (bestSell->remainingQuantity == 0) {
                orderBook.removeBestSellOrder();
            }
        }

        if (incomingOrder.remainingQuantity > 0 && incomingOrder.type == OrderType::LIMIT) {
            orderBook.addOrder(incomingOrder);
        }
    } else if (incomingOrder.side == OrderSide::SELL) {
        while (incomingOrder.remainingQuantity > 0 && orderBook.hasBuyOrders()) {
            Order* bestBuy = orderBook.getBestBuyOrder();

            if (incomingOrder.type == OrderType::LIMIT && incomingOrder.price > bestBuy->price) {
                break; // Limit price condition not met
            }

            int matchQuantity = std::min(incomingOrder.remainingQuantity, bestBuy->remainingQuantity);
            double matchPrice = bestBuy->price; // Passive order price

            Trade trade;
            trade.buyOrderId = bestBuy->id;
            trade.sellOrderId = incomingOrder.id;
            trade.stockId = incomingOrder.stockId;
            trade.price = matchPrice;
            trade.quantity = matchQuantity;
            trade.timestamp = std::time(nullptr);

            incomingOrder.remainingQuantity -= matchQuantity;
            bestBuy->remainingQuantity -= matchQuantity;

            matchedTrades.push_back(trade);
            tradeHistory.push_back(trade);

            if (bestBuy->remainingQuantity == 0) {
                orderBook.removeBestBuyOrder();
            }
        }

        if (incomingOrder.remainingQuantity > 0 && incomingOrder.type == OrderType::LIMIT) {
            orderBook.addOrder(incomingOrder);
        }
    }

    return matchedTrades;
}

OrderBook& MatchingEngine::getOrderBook(const std::string& stockId) {
    return orderBooks[stockId];
}

const std::vector<Trade>& MatchingEngine::getTradeHistory() const {
    return tradeHistory;
}

void MatchingEngine::printOrderBook(const std::string& stockId) const {
    auto it = orderBooks.find(stockId);
    if (it != orderBooks.end()) {
        std::cout << "Order Book for " << stockId << ":\n";
        it->second.printOrderBook();
    } else {
        std::cout << "No order book found for " << stockId << "\n";
    }
}

void MatchingEngine::printTradeHistory() const {
    std::cout << "\n========== TRADE HISTORY ==========\n";
    if (tradeHistory.empty()) {
        std::cout << "No trades executed yet.\n";
    } else {
        for (const auto& trade : tradeHistory) {
            std::cout << "Stock: " << trade.stockId
                      << " | Buy Order: " << trade.buyOrderId
                      << " | Sell Order: " << trade.sellOrderId
                      << " | Price: " << trade.price
                      << " | Qty: " << trade.quantity
                      << " | Time: " << trade.timestamp << "\n";
        }
    }
    std::cout << "===================================\n";
}
