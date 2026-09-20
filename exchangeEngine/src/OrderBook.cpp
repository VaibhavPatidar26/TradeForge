#include "../include/OrderBook.h"
#include <iostream>

void OrderBook::addOrder(const Order& order) {
    if (order.side == OrderSide::BUY) {
        buyOrders[order.price].push_back(order);
    } else {
        sellOrders[order.price].push_back(order);
    }
}

Order* OrderBook::getBestBuyOrder() {
    if (buyOrders.empty()) {
        return nullptr;
    }
    return &buyOrders.begin()->second[0];
}

Order* OrderBook::getBestSellOrder() {
    if (sellOrders.empty()) {
        return nullptr;
    }
    return &sellOrders.begin()->second[0];
}

void OrderBook::removeBestBuyOrder() {
    if (buyOrders.empty()) {
        return;
    }

    auto it = buyOrders.begin();
    it->second.erase(it->second.begin());

    if (it->second.empty()) {
        buyOrders.erase(it);
    }
}

void OrderBook::removeBestSellOrder() {
    if (sellOrders.empty()) {
        return;
    }

    auto it = sellOrders.begin();
    it->second.erase(it->second.begin());

    if (it->second.empty()) {
        sellOrders.erase(it);
    }
}

bool OrderBook::hasBuyOrders() const {
    return !buyOrders.empty();
}

bool OrderBook::hasSellOrders() const {
    return !sellOrders.empty();
}

const std::map<double, std::vector<Order>, std::greater<double>>& OrderBook::getBuyOrders() const {
    return buyOrders;
}

const std::map<double, std::vector<Order>>& OrderBook::getSellOrders() const {
    return sellOrders;
}

void OrderBook::printOrderBook() const {
    std::cout << "\n========== ORDER BOOK ==========\n";

    std::cout << "\n--------- SELL ---------\n";
    for (const auto& priceLevel : sellOrders) {
        std::cout << "Price: " << priceLevel.first << " Quantity: ";
        int totalQuantity = 0;
        for (const auto& order : priceLevel.second) {
            totalQuantity += order.remainingQuantity;
        }
        std::cout << totalQuantity << "\n";
    }

    std::cout << "\n--------- BUY ---------\n";
    for (const auto& priceLevel : buyOrders) {
        std::cout << "Price: " << priceLevel.first << " Quantity: ";
        int totalQuantity = 0;
        for (const auto& order : priceLevel.second) {
            totalQuantity += order.remainingQuantity;
        }
        std::cout << totalQuantity << "\n";
    }

    std::cout << "===============================\n";
}