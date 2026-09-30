import { Request, Response, NextFunction } from "express";
export declare function idempotencyMiddleware(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
//# sourceMappingURL=idempotentCheck.d.ts.map