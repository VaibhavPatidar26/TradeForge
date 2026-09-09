export function Portfolio(){


        const holdings = [
            {
                id: "1",
                name: "DABUR INDIA",
                symbol: "DABUR",
                quantity: 10,
                averagePrice: 371.55,
                currentPrice: 385.20
            },
            {
                id: "2",
                name: "TATA CONSULTANCY",
                symbol: "TCS",
                quantity: 5,
                averagePrice: 3100,
                currentPrice: 3180
            }
        ];

        return (
            <div className="flex-1 h-full min-h-0 bg-[#0b0e11] text-white p-3 overflow-y-auto">

                <h1 className="text-lg font-semibold mb-3">
                    Portfolio
                </h1>

                <div className="rounded-lg border border-[#252b33] bg-[#11161c] overflow-hidden">

                    {holdings.length > 0 ? (

                        holdings.map(function (holding) {

                            const investedValue =
                                holding.quantity * holding.averagePrice;

                            const currentValue =
                                holding.quantity * holding.currentPrice;

                            const profitLoss =
                                currentValue - investedValue;

                            const profitLossPercentage =
                                (profitLoss / investedValue) * 100;

                            return (
                                <div
                                    key={holding.id}
                                    className="p-3 border-b border-[#252b33] hover:bg-[#151b22] transition-colors"
                                >

                                    {/* Top section */}
                                    <div className="flex justify-between items-start">

                                        <div>
                                            <div className="font-medium text-sm">
                                                {holding.name}
                                            </div>

                                            <div className="text-xs text-gray-500 mt-1">
                                                {holding.symbol}
                                            </div>
                                        </div>

                                        <div className="text-right">
                                            <div className="text-sm font-medium">
                                                ₹{holding.currentPrice.toFixed(2)}
                                            </div>

                                            <div
                                                className={`text-xs mt-1 ${
                                                    profitLoss >= 0
                                                        ? "text-[#089981]"
                                                        : "text-[#f23645]"
                                                }`}
                                            >
                                                {profitLoss >= 0 ? "+" : ""}
                                                ₹{profitLoss.toFixed(2)}
                                            </div>
                                        </div>

                                    </div>

                                    {/* Bottom section */}
                                    <div className="grid grid-cols-3 mt-4 pt-3 border-t border-[#252b33]">

                                        <div>
                                            <div className="text-[11px] text-gray-500">
                                                QTY
                                            </div>

                                            <div className="text-sm mt-1">
                                                {holding.quantity}
                                            </div>
                                        </div>

                                        <div>
                                            <div className="text-[11px] text-gray-500">
                                                AVG. PRICE
                                            </div>

                                            <div className="text-sm mt-1">
                                                ₹{holding.averagePrice.toFixed(2)}
                                            </div>
                                        </div>

                                        <div>
                                            <div className="text-[11px] text-gray-500">
                                                P&L %
                                            </div>

                                            <div
                                                className={`text-sm mt-1 ${
                                                    profitLossPercentage >= 0
                                                        ? "text-[#089981]"
                                                        : "text-[#f23645]"
                                                }`}
                                            >
                                                {profitLossPercentage >= 0 ? "+" : ""}
                                                {profitLossPercentage.toFixed(2)}%
                                            </div>
                                        </div>

                                    </div>

                                </div>
                            );
                        })

                    ) : (

                        <div className="p-4 text-center text-sm text-gray-500">
                            You don't have any holdings
                        </div>

                    )}

                </div>

            </div>
        );
    }

