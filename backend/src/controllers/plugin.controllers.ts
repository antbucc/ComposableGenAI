// src/controllers/plugin.controllers.ts

import { Request, Response, NextFunction } from 'express';
import { PluginManager } from '../plugins/plugin.manager';

export const listPlugins = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const plugins = PluginManager.listPlugins();
        return res.status(200).json({ plugins });
    } catch (err) {
        next(err);
    }
};
