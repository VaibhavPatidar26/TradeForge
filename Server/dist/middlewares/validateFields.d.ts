import { Request, Response, NextFunction } from "express";
import { ZodType } from "zod";
export declare function validate(schema: ZodType): (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=validateFields.d.ts.map