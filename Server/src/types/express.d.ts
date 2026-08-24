declare global {
    namespace Express {
        interface Request {
            userId?: string;
            emailId?: string;
        }
    }
}

export {};