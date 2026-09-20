#ifndef MATCHINGENGINE_H
#define MATCHINGENGINE_H

#include <map>
#include <vector>
#include <string>
#include "OrderBook.h"
#include "Trade.h"

class MatchingEngine {
private:
    std::map<std::string, OrderBook> orderBooks;
    std::vector<Trade> tradeHistory;

public:
    MatchingEngine() = default;

    std::vector<Trade> processOrder(Order order);
    OrderBook& getOrderBook(const std::string& stockId);
    const std::vector<Trade>& getTradeHistory() const;

    void printOrderBook(const std::string& stockId) const;
    void printTradeHistory() const;
};

#endif // MATCHINGENGINE_H
