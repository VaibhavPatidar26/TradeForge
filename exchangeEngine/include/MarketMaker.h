#ifndef MARKETMAKER_H
#define MARKETMAKER_H

#include <string>
#include "MatchingEngine.h"

class MarketMaker {
private:
    bool enabled;

public:
    MarketMaker(bool isEnabled = true);

    void setEnabled(bool isEnabled);
    bool isEnabled() const;

    // Seeds initial bid & ask limit orders around referencePrice
    void seedLiquidity(MatchingEngine& engine,
                       const std::string& stockId,
                       double referencePrice,
                       int levels = 5,
                       double stepPercent = 0.002,
                       int baseQuantity = 100);
};

#endif // MARKETMAKER_H
