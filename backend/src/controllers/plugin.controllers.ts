// src/controllers/plugin.controllers.ts

import { Request, Response, NextFunction } from 'express';
import { PluginService } from '../services/plugin.services';
import { PluginManager } from '../plugins/plugin.manager';

export const executePlugin = async (req: Request, res: Response, next: NextFunction) => {
    const { pluginName } = req.params;
    const params = req.body;

    try {
        const output = await PluginService.executePlugin(pluginName, params);
        return res.status(200).json(output);
    } catch (err) {
        next(err);
    }
};

export const listPlugins = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const plugins = PluginManager.listPlugins();
        return res.status(200).json({ plugins });
    } catch (err) {
        next(err);
    }
};
