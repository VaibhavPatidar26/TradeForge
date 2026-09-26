import { WebSocket } from "ws";
import "dotenv/config";
declare const mp: Map<WebSocket, string>;
declare const watchlists: Map<string, string[]>;
export default function startWebSocketServer(): Promise<void>;
export declare function updatewatchlist(userId: string, stockId: string): Promise<void>;
export declare function removeStockFromWatchlist(userId: string, stockId: string): void;
export { mp, watchlists };
//# sourceMappingURL=connection.d.ts.map