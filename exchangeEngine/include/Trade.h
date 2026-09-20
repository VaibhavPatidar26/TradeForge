#ifndef TRADE_H
#define TRADE_H

#include <string>

struct Trade {
    std::string buyOrderId;
    std::string sellOrderId;

    std::string stockId;

    double price;
    int quantity;

    long long timestamp;
};

#endif // TRADE_H