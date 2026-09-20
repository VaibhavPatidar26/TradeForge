#ifndef ORDERBOOK_H
#define ORDERBOOK_H

#include <map>
#include <vector>
#include <functional>
#include "Order.h"

class OrderBook {
private:
    std::map<double, std::vector<Order>, std::greater<double>> buyOrders;
    std::map<double, std::vector<Order>> sellOrders;

public:
    void addOrder(const Order& order);

    Order* getBestBuyOrder();
    Order* getBestSellOrder();

    void removeBestBuyOrder();
    void removeBestSellOrder();

    bool hasBuyOrders() const;
    bool hasSellOrders() const;

    const std::map<double, std::vector<Order>, std::greater<double>>& getBuyOrders() const;
    const std::map<double, std::vector<Order>>& getSellOrders() const;

    void printOrderBook() const;
};

#endif // ORDERBOOK_H