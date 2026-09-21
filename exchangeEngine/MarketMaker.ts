import { MatchingEngine } from "./MatchingEngine.js";
import { Order, OrderSide, OrderType } from "./types.js";

export class MarketMaker {
    private enabled: boolean;

    constructor(isEnabled: boolean = true) {
        this.enabled = isEnabled;
    }

    public setEnabled(isEnabled: boolean): void {
        this.enabled = isEnabled;
    }

    public isEnabled(): boolean {
        return this.enabled;
    }

    public seedLiquidity(
        engine: MatchingEngine,
        stockId: string,
        referencePrice: number,
        levels: number = 5,
        stepPercent: number = 0.002,
        baseQuantity: number = 100
    ): void {
        if (!this.enabled) {
            console.log(`[MarketMaker] Bot is disabled. Skipping liquidity seeding for ${stockId}.`);
            return;
        }

        console.log(
            `[MarketMaker] Seeding ${levels} levels of liquidity for ${stockId} around reference price ₹${referencePrice}...`
        );

        const now = Math.floor(Date.now() / 1000);

        // 1. Seed ASK (Sell Limit Orders above reference price)
        for (let i = 1; i <= levels; i++) {
            const rawPrice = referencePrice * (1.0 + i * stepPercent);
            const price = Math.round(rawPrice * 100) / 100;
            const qty = baseQuantity * i;

            const sellOrder: Order = {
                id: `mm-sell-${i}`,
                userId: "MARKET_MAKER_BOT",
                stockId,
                side: OrderSide.SELL,
                type: OrderType.LIMIT,
                price,
                quantity: qty,
                remainingQuantity: qty,
                timestamp: now + i
            };

            engine.processOrder(sellOrder);
        }

        // 2. Seed BID (Buy Limit Orders below reference price)
        for (let i = 1; i <= levels; i++) {
            const rawPrice = referencePrice * (1.0 - i * stepPercent);
            const price = Math.round(rawPrice * 100) / 100;
            const qty = baseQuantity * i;

            const buyOrder: Order = {
                id: `mm-buy-${i}`,
                userId: "MARKET_MAKER_BOT",
                stockId,
                side: OrderSide.BUY,
                type: OrderType.LIMIT,
                price,
                quantity: qty,
                remainingQuantity: qty,
                timestamp: now + i
            };

            engine.processOrder(buyOrder);
        }

        console.log(`[MarketMaker] Liquidity successfully seeded for ${stockId}.`);
    }
}

// Export singleton instance
export const marketMaker = new MarketMaker(true);
