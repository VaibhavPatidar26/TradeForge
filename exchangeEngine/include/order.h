#ifndef ORDER_H
#define ORDER_H

#include <string>

enum class OrderSide {
    BUY,
    SELL
};

enum class OrderType {
    LIMIT,
    MARKET
};

struct Order {
    std::string id;
    std::string userId;
    std::string stockId;

    OrderSide side;
    OrderType type;

    double price;
    int quantity;
    int remainingQuantity;

    long long timestamp;
};

#endif // ORDER_H