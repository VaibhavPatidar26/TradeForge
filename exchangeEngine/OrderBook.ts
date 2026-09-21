import { Order, OrderSide } from "./types.js";

export class OrderBook {
    private buyOrders: Map<number, Order[]> = new Map(); // Bids (Price -> Orders)
    private sellOrders: Map<number, Order[]> = new Map(); // Asks (Price -> Orders)

    public addOrder(order: Order): void {
        const targetMap = order.side === OrderSide.BUY ? this.buyOrders : this.sellOrders;
        if (!targetMap.has(order.price)) {
            targetMap.set(order.price, []);
        }
        targetMap.get(order.price)!.push({ ...order });
    }

    public getBestBuyOrder(): Order | null {
        if (this.buyOrders.size === 0) return null;
        const sortedPrices = Array.from(this.buyOrders.keys()).sort((a, b) => b - a);
        const bestPrice = sortedPrices[0];
        const ordersAtPrice = this.buyOrders.get(bestPrice);
        if (!ordersAtPrice || ordersAtPrice.length === 0) return null;
        return ordersAtPrice[0];
    }

    public getBestSellOrder(): Order | null {
        if (this.sellOrders.size === 0) return null;
        const sortedPrices = Array.from(this.sellOrders.keys()).sort((a, b) => a - b);
        const bestPrice = sortedPrices[0];
        const ordersAtPrice = this.sellOrders.get(bestPrice);
        if (!ordersAtPrice || ordersAtPrice.length === 0) return null;
        return ordersAtPrice[0];
    }

    public removeBestBuyOrder(): void {
        if (this.buyOrders.size === 0) return;
        const sortedPrices = Array.from(this.buyOrders.keys()).sort((a, b) => b - a);
        const bestPrice = sortedPrices[0];
        const ordersAtPrice = this.buyOrders.get(bestPrice);
        if (ordersAtPrice) {
            ordersAtPrice.shift();
            if (ordersAtPrice.length === 0) {
                this.buyOrders.delete(bestPrice);
            }
        }
    }

    public removeBestSellOrder(): void {
        if (this.sellOrders.size === 0) return;
        const sortedPrices = Array.from(this.sellOrders.keys()).sort((a, b) => a - b);
        const bestPrice = sortedPrices[0];
        const ordersAtPrice = this.sellOrders.get(bestPrice);
        if (ordersAtPrice) {
            ordersAtPrice.shift();
            if (ordersAtPrice.length === 0) {
                this.sellOrders.delete(bestPrice);
            }
        }
    }

    public hasBuyOrders(): boolean {
        return this.buyOrders.size > 0;
    }

    public hasSellOrders(): boolean {
        return this.sellOrders.size > 0;
    }

    public getBuyOrdersMap(): Map<number, Order[]> {
        return this.buyOrders;
    }

    public getSellOrdersMap(): Map<number, Order[]> {
        return this.sellOrders;
    }

    public printOrderBook(): void {
        console.log("\n========== ORDER BOOK ==========");
        console.log("\n--------- SELL (ASKS) ---------");
        const sortedAsks = Array.from(this.sellOrders.keys()).sort((a, b) => a - b);
        for (const price of sortedAsks) {
            const orders = this.sellOrders.get(price) || [];
            const totalQty = orders.reduce((sum, o) => sum + o.remainingQuantity, 0);
            console.log(`Price: ₹${price} | Quantity: ${totalQty}`);
        }

        console.log("\n--------- BUY (BIDS) ---------");
        const sortedBids = Array.from(this.buyOrders.keys()).sort((a, b) => b - a);
        for (const price of sortedBids) {
            const orders = this.buyOrders.get(price) || [];
            const totalQty = orders.reduce((sum, o) => sum + o.remainingQuantity, 0);
            console.log(`Price: ₹${price} | Quantity: ${totalQty}`);
        }
        console.log("===============================\n");
    }
}
