// src/routes/plugin.routes.ts

import { Router } from 'express';
import { listPlugins } from '../controllers/plugin.controllers';

const router = Router();

router.get('/', listPlugins);

export default router;
