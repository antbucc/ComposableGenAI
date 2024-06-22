// src/middlewares/auth.middleware.ts

import { Request, Response, NextFunction } from "express";

const checkAuth = (req: Request, res: Response, next: NextFunction) => {
    next();
};

export default checkAuth;
