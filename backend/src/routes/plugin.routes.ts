// src/routes/plugin.routes.ts

import { Router } from 'express';
import { listPlugins, executePlugin } from '../controllers/plugin.controllers';

const router = Router();

router.get('/', listPlugins);
router.post('/:pluginName/execute', executePlugin);

export default router;
